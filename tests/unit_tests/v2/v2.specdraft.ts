// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IPAIClusterInfo, OpenPAIClient } from '@api/v2';
import ajv, { Ajv } from 'ajv';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

import apiTestCaseJson from '../../../.tests/apiTestCase.json';
import { runOperation, runOperations } from '../../api_tests/v2/api.v2.spec.js';
import { IApiOperation, IApiTestCase } from '../../common/apiTestCaseGenerator';
import { CustomizedTests } from '../../common/apiTestCases';
import { TestCluster } from '../../common/testCluster';

/**
 * End to end tests for OpenPAI API v2.
 */
let ajvInstance: Ajv;
let openPAIClient: any;
let clusterInfo: IPAIClusterInfo;

// A revoked jwt token, from user: sdk_test
const testToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNka190ZXN0IiwiYXBwbGljYXRpb24iOmZhbHN' +
    'lLCJpYXQiOjE1ODk3NzE3NDMsImV4cCI6MTU5MDM3NjU0M30.LxDbmzzhhEQ0SKHOFkNFzstEdxCfTgDnu7nZE7Nm-hA';

const testUrl: string = 'https://openpai.test/rest-server';

const apiGetClusterInfo: string = '/api/v2/info';

const testCluster: IPAICluster = {
    rest_server_uri: testUrl,
    username: 'sdk_test',
    password: 'test_password',
    token: testToken
};

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
                if (testItem.customizedTest) {
                    return;
                    /*await (CustomizedTests as any)[testItem.customizedTest](
                        testItem,
                        {
                            beforeEachResults,
                            beforeResults,
                            testResults
                        }
                    );*/
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
