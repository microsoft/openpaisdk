// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IPAIClusterInfo, OpenPAIClient } from '@api/v2';
import ajv, { Ajv } from 'ajv';
import * as chai from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

import apiTestCaseJson from '../../../.tests/apiTestCase.json';
import { IApiTestCase } from '../../common/apiTestCaseGenerator';
import { ApiTestRunner } from '../../common/apiTestRunner';

/**
 * End to end tests for OpenPAI API v2.
 */
let ajvInstance: Ajv;
let openPAIClient: any;
let clusterInfo: IPAIClusterInfo;
let runner: ApiTestRunner;

// A revoked jwt token, from user: sdk_test
const testToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNka190ZXN0IiwiYXBwbGljYXRpb24iOmZhbHN' +
    'lLCJpYXQiOjE1ODk3NzE3NDMsImV4cCI6MTU5MDM3NjU0M30.LxDbmzzhhEQ0SKHOFkNFzstEdxCfTgDnu7nZE7Nm-hA';

const testUrl: string = 'https://openpai.test/rest-server';

const apiGetClusterInfo: string = '/api/v2/info';

const testClusterInfo: IPAIClusterInfo = {
    name: 'PAI RESTful API',
    version: 'v1.0.1',
    launcherType: 'k8s',
    authnMethod: 'basic'
};

const testCluster: IPAICluster = {
    rest_server_uri: testUrl,
    username: 'sdk_test',
    password: 'test_password',
    token: testToken
};

chai.use(dirtyChai);
before(async () => {
    nock(testUrl).get(apiGetClusterInfo).reply(200, testClusterInfo);

    ajvInstance = new ajv({ nullable: true });
    openPAIClient = new OpenPAIClient(testCluster);
    clusterInfo = await openPAIClient.api.getClusterInfo();
    runner = new ApiTestRunner(openPAIClient, ajvInstance, apiTestCaseJson.map, {
        rest_server_uri: testUrl
    });
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
                if (testItem.customizedTest) {
                    return;
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
