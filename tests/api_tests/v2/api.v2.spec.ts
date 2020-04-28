// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAIClusterInfo, OpenPAIClient } from '@api/v2';
import ajv, { Ajv } from 'ajv';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import { IApiOperation, IApiTestCase } from '../../common/apiTestCaseGenerator';
import { CustomizedTests } from '../../common/apiTestCases';
import { TestCluster } from '../../common/testCluster';

import apiTestCaseJson from './apiTestCase.json';

/**
 * End to end tests for OpenPAI API v2.
 */
let ajvInstance: Ajv;
let openPAIClient: any;
let clusterInfo: IPAIClusterInfo;

export interface IOperationResults {
    beforeEachResults: any[];
    beforeResults: any[];
    testResults: any[];
}

chai.use(dirtyChai);
before(async () => {
    ajvInstance = new ajv({ nullable: true });
    openPAIClient = new OpenPAIClient(TestCluster.cluster);
    clusterInfo = await openPAIClient.api.getClusterInfo();
});

for (const test of apiTestCaseJson as IApiTestCase[]) {
    let beforeEachResults: any[];
    let beforeResults: any[];
    const testResults: any[] = [];

    describe(test.description!, () => {
        beforeEach(async () => beforeEachResults = await runOperations(test.beforeEach));
        before(async () => beforeResults = await runOperations(test.before));

        for (const testItem of test.tests) {
            it (testItem.description || test.description || 'unknown test', async () => {
                if (skipTest(testItem.operation!)) {
                    return;
                }

                if (testItem.customizedTest) {
                    await (CustomizedTests as any)[testItem.customizedTest](
                        testItem,
                        {
                            beforeEachResults,
                            beforeResults,
                            testResults
                        }
                    );
                } else {
                    const res: any = await runOperation(
                        testItem.operation!,
                        {
                            beforeEachResults,
                            beforeResults,
                            testResults
                        }
                    );
                    if (res) {
                        testResults.push(res);
                    }
                }
            });
        }

        after(async () => await runOperations(
            test.after,
            {
                beforeEachResults,
                beforeResults,
                testResults
            }));
        afterEach(async () => await runOperations(
            test.afterEach,
            {
                beforeEachResults,
                beforeResults,
                testResults
            }));
    });
}

function skipTest(operation: IApiOperation): boolean {
    if (clusterInfo.authnMethod === 'OIDC') {
        if ([
                'basicLogin',
                'basicLogout',
                'createUser',
                'deleteUser',
                'updateUserSelf',
                'updateUser',
                'updateUserGroup',
                'deleteUserGroup',
                'updateUserGrouplist'
            ].includes(operation.operationId!)
        ) {
            return true;
        }
    } else {
        if (['oidcLogin', 'oidcLogout'].includes(operation.operationId!)) {
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

async function runOperation(
    operation: IApiOperation, operationResults?: IOperationResults
): Promise<any> {
    const client: any = operation.cluster ?
        (new OpenPAIClient(operation.cluster) as any)[operation.tag!] :
        openPAIClient[getClientName(operation.tag!)];
    const parameters: any[] = [];
    if (operation.parameters) {
        for (const para of operation.parameters) {
            if (para.type === 'raw') {
                parameters.push(para.value);
            } else  if (operationResults) {
                let parameter: any = operationResults[para.resultType!][para.resultIndex!];
                if (para.resultPath) {
                    for (const item of para.resultPath) {
                        parameter = parameter[item];
                    }
                }
                parameters.push(parameter);
            }
        }
    }
    const res: any = await client[operation.operationId!](...parameters);
    if (operation.response) {
        if (operation.response.schema) {
            const valid: boolean = ajvInstance.validate(operation.response.schema, res) as boolean;
            if (!valid) {
                console.log(ajvInstance.errors);
            }
            expect(valid, 'response should be valid.').to.be.true();
        }
        if (operation.response.expectResult) {
            for (const key of Object.keys(operation.response.expectResult)) {
                expect(res[key]).to.be.eq(operation.response.expectResult[key]);
            }
        }
    }

    return res;
}

async function runOperations(
    operations?: IApiOperation[], operationResults?: IOperationResults
): Promise<any> {
    const result: any[] = [];
    if (operations) {
        for (const operation of operations) {
            const res: any = await runOperation(operation, operationResults);
            if (res) {
                result.push(res);
            }
        }
    }
    return result;
}
