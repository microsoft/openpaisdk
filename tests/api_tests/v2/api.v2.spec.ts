// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAIClusterInfo, OpenPAIClient } from '@api/v2';
import swaggerParser from '@apidevtools/swagger-parser';
import ajv, { Ajv } from 'ajv';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import { TestCluster } from '../../common/testCluster';

/**
 * End to end tests for OpenPAI API v2.
 */
let api: any;
let ajvInstance: Ajv;
let openPAIClient: any;
let clusterInfo: IPAIClusterInfo;
const operations: any[] = [];

const testApis: any = {
    '/api/v2/info': { get: [] },
    '/api/v2/tokens': { get: [] },
    '/api/v2/tokens/{token}': { delete: [] },
    '/api/v2/tokens/application': { post: [] },
    '/api/v2/authn/oidc/login': { get: [] },
    '/api/v2/authn/oidc/logout': { get: [] },
    '/api/v2/authn/basic/login': { post: [] },
    '/api/v2/authn/basic/logout': { delete: [] },
    '/api/v2/users': { post: [], get: [], put: [] },
    '/api/v2/users/me': { put: [] },
    '/api/v2/users/{user}': { parameters: [], get: [], delete: [] },
    '/api/v2/users/{user}/group/': { parameters: [], put: [], delete: [] },
    '/api/v2/users/{user}/grouplist/': { parameters: [], put: [] },
    '/api/v2/groups': { get: [], post: [], put: [] },
    '/api/v2/groups/{group}': { parameters: [], get: [], delete: [] },
    '/api/v2/groups/{group}/userlist': { parameters: [], get: [] },
    '/api/v2/virtual-clusters': { get: [] },
    '/api/v2/virtual-clusters/{vc}': { get: [] },
    '/api/v2/virtual-clusters/{vc}/sku-types': { get: [] },
    '/api/v2/storages': { get: [] },
    '/api/v2/storages/{storage}': { get: [] },
    '/api/v2/jobs': { post: [], get: [] },
    '/api/v2/jobs/{user}~{job}': { get: [] },
    '/api/v2/jobs/{user}~{job}/config': { get: [] },
    '/api/v2/jobs/{user}~{job}/exectionType': { put: [] },
    '/api/v2/jobs/{user}~{job}/job-attempts/healthz': { get: [] },
    '/api/v2/jobs/{user}~{job}/job-attempts': { get: [] },
    '/api/v2/jobs/{user}~{job}/job-attempts/{attemptIndex}': { get: [] },
    '/api/v2/kubernetes/nodes': { get: [] },
    '/api/v2/kubernetes/pods': { get: [] }
};
const testOps: any[] = [];
for (const path of Object.keys(testApis)) {
    const ops: any = testApis[path];
    for (const type of Object.keys(ops)) {
        testOps.push({
            ...{ operationType: type, path: path }, ...ops[type]
        });
    }
}

chai.use(dirtyChai);
before(async () => {
    ajvInstance = new ajv();
    api = await swaggerParser.dereference('src/api/v2/swagger.yaml');
    openPAIClient = new OpenPAIClient(TestCluster.cluster);
    clusterInfo = await openPAIClient.api.getClusterInfo();

    for (const path of Object.keys(api.paths)) {
        const ops: any = api.paths[path];
        for (const type of Object.keys(ops)) {
            operations.push({
                ...{ operationType: type, path: path }, ...ops[type]
            });
        }
    }
});

describe('Check api number', () => {
    it('should cover all apis in swagger', () => {
        expect(testOps.length).to.be.eq(operations.length);
    });
});

describe('Test api client', () => {
    for (const op of testOps) {
        if (op.operationType === 'parameters') {
            continue;
        }

        it(op.operationType + ' ' + op.path, async () => {
            const operation: any = operations.find(
                item => item.operationType === op.operationType && item.path === op.path
            );
            const okResponse: any = operation.responses['200'];
            let schema: any;
            if (okResponse) {
                const jsonResponse: any = okResponse.content ?
                    okResponse.content['application/json'] : undefined;
                if (jsonResponse) {
                    schema = jsonResponse.schema;
                }
            }

            if (skipTest(operation)) {
                return;
            }

            if (schema) {
                const schemaValidate: boolean = ajvInstance.validateSchema(schema);
                expect(schemaValidate, 'schema should be valid.').to.be.true();
            }

            const client: any = openPAIClient[getClientName(operation.tags[0])];
            expect(client, 'client should match tag name.').not.to.be.undefined();

            let res: any;
            res = await client[operation.operationId]();

            if (schema) {
                const valid: boolean = ajvInstance.validate(schema, res) as boolean;
                if (!valid) {
                    console.log(ajvInstance.errors);
                }
                expect(valid, 'response should be valid.').to.be.true();
            }
        });
    }
});

function skipTest(operation: any): boolean {
    if (clusterInfo.authnMethod === 'OIDC') {
        if (
            ['basicLogin', 'basicLogout', 'createUser', 'delete', 'updateUserSelf']
                .includes(operation.operationId)
        ) {
            return true;
        }
    } else {
        if (['oidcLogin', 'oidcLogout'].includes(operation.operationId)) {
            return true;
        }
    }

    return false;
}

function getClientName(tag: string): string {
    const words: string[] = tag.split(' ');
    if (words.length === 1) {
        return tag;
    }

    return words[0] + words[1].charAt(0).toUpperCase() + words[1].slice(1);
}
