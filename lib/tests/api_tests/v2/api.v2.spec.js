"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../../../src/api/v2");
const ajv_1 = __importDefault(require("ajv"));
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const apiTestCases_1 = require("../../common/apiTestCases");
const testCluster_1 = require("../../common/testCluster");
const apiTestCase_json_1 = __importDefault(require("./apiTestCase.json"));
/**
 * End to end tests for OpenPAI API v2.
 */
let ajvInstance;
let openPAIClient;
let clusterInfo;
chai.use(dirty_chai_1.default);
before(async () => {
    ajvInstance = new ajv_1.default({ nullable: true });
    openPAIClient = new v2_1.OpenPAIClient(testCluster_1.TestCluster.cluster);
    clusterInfo = await openPAIClient.api.getClusterInfo();
});
for (const test of apiTestCase_json_1.default) {
    let beforeEachResults;
    let beforeResults;
    const testResults = [];
    describe(test.description, () => {
        beforeEach(async () => beforeEachResults = await runOperations(test.beforeEach));
        before(async () => beforeResults = await runOperations(test.before));
        for (const testItem of test.tests) {
            it(testItem.description || test.description || 'unknown test', async () => {
                if (skipTest(testItem.operation)) {
                    return;
                }
                if (testItem.customizedTest) {
                    await apiTestCases_1.CustomizedTests[testItem.customizedTest](testItem, {
                        beforeEachResults,
                        beforeResults,
                        testResults
                    });
                }
                else {
                    const res = await runOperation(testItem.operation, {
                        beforeEachResults,
                        beforeResults,
                        testResults
                    });
                    if (res) {
                        testResults.push(res);
                    }
                }
            });
        }
        after(async () => await runOperations(test.after, {
            beforeEachResults,
            beforeResults,
            testResults
        }));
        afterEach(async () => await runOperations(test.afterEach, {
            beforeEachResults,
            beforeResults,
            testResults
        }));
    });
}
function skipTest(operation) {
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
        ].includes(operation.operationId)) {
            return true;
        }
    }
    else {
        if (['oidcLogin', 'oidcLogout'].includes(operation.operationId)) {
            return true;
        }
    }
    return false;
}
function getClientName(tag) {
    const words = tag.split(' ');
    if (words.length === 1) {
        return tag;
    }
    return words[0] + words[1].charAt(0).toUpperCase() + words[1].slice(1);
}
async function runOperation(operation, operationResults) {
    const client = operation.cluster ?
        new v2_1.OpenPAIClient(operation.cluster)[operation.tag] :
        openPAIClient[getClientName(operation.tag)];
    const parameters = [];
    if (operation.parameters) {
        for (const para of operation.parameters) {
            if (para.type === 'raw') {
                parameters.push(para.value);
            }
            else if (operationResults) {
                let parameter = operationResults[para.resultType][para.resultIndex];
                if (para.resultPath) {
                    for (const item of para.resultPath) {
                        parameter = parameter[item];
                    }
                }
                parameters.push(parameter);
            }
        }
    }
    const res = await client[operation.operationId](...parameters);
    if (operation.response) {
        if (operation.response.schema) {
            const valid = ajvInstance.validate(operation.response.schema, res);
            if (!valid) {
                console.log(ajvInstance.errors);
            }
            chai_1.expect(valid, 'response should be valid.').to.be.true();
        }
        if (operation.response.expectResult) {
            for (const key of Object.keys(operation.response.expectResult)) {
                chai_1.expect(res[key]).to.be.eq(operation.response.expectResult[key]);
            }
        }
    }
    return res;
}
async function runOperations(operations, operationResults) {
    const result = [];
    if (operations) {
        for (const operation of operations) {
            const res = await runOperation(operation, operationResults);
            if (res) {
                result.push(res);
            }
        }
    }
    return result;
}
