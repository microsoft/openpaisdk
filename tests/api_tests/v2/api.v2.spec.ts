// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAIClusterInfo, OpenPAIClient } from '@api/v2';
import ajv, { Ajv } from 'ajv';
import * as chai from 'chai';
import dirtyChai from 'dirty-chai';

import apiTestCaseJson from '../../../.tests/apiTestCase.json';
import { IApiOperation, IApiTestCase } from '../../common/apiTestCaseGenerator';
import { CustomizedTests } from '../../common/apiTestCases';
import { ApiTestRunner } from '../../common/apiTestRunner';
import { TestCluster } from '../../common/testCluster';

/**
 * End to end tests for OpenPAI API v2.
 */
let ajvInstance: Ajv;
let openPAIClient: any;
let clusterInfo: IPAIClusterInfo;
let runner: ApiTestRunner;

chai.use(dirtyChai);
before(async () => {
    ajvInstance = new ajv({ nullable: true });
    openPAIClient = new OpenPAIClient(TestCluster.cluster);
    clusterInfo = await openPAIClient.api.getClusterInfo();
    runner = new ApiTestRunner(openPAIClient, ajvInstance, apiTestCaseJson.map);
});

for (const test of apiTestCaseJson.tests as IApiTestCase[]) {
    let beforeEachResults: any[];
    let beforeResults: any[];
    const testResults: any[] = [];

    describe(test.description!, () => {
        beforeEach(async () => beforeEachResults = await runner.runOperations(test.beforeEach));
        before(async () => beforeResults = await runner.runOperations(test.before));

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
                    const res: any = await runner.runOperation(
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

        after(async () => await runner.runOperations(
            test.after,
            {
                beforeEachResults,
                beforeResults,
                testResults
            }));
        afterEach(async () => await runner.runOperations(
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
