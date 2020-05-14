"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("../../src/api/v2/clients");
const paiJobErrors_js_1 = require("@pai/commom/errors/paiJobErrors.js");
const ajv_1 = __importDefault(require("ajv"));
const chai_1 = require("chai");
const crypto_1 = __importDefault(require("crypto"));
const clusters_json_1 = __importDefault(require("../../.tests/clusters.json"));
const testJobConfig_1 = require("./test_data/testJobConfig");
/**
 * Random string class.
 */
class RandomString {
    get() {
        if (this.data) {
            return this.data;
        }
        else {
            return this.new();
        }
    }
    new() {
        this.data = crypto_1.default.randomBytes(4).toString('hex');
        return this.data;
    }
}
const randomString = new RandomString();
const createTestGroup = {
    tag: 'group',
    operationId: 'createGroup',
    parameters: [{
            type: 'raw',
            value: {
                groupname: 'sdktestgroup'
            }
        }]
};
const deleteTestGroup = {
    tag: 'group',
    operationId: 'deleteGroup',
    parameters: [{
            type: 'raw',
            value: 'sdktestgroup'
        }]
};
function createTestJob() {
    return {
        tag: 'job',
        operationId: 'createJob',
        parameters: [{
                type: 'raw',
                value: {
                    ...testJobConfig_1.testJobConfig,
                    ...{ name: 'sdk_test_job' + randomString.new() }
                }
            }]
    };
}
function updateTestJobExecutionType(executionType) {
    return {
        tag: 'job',
        operationId: 'updateJobExecutionType',
        parameters: [
            {
                type: 'raw',
                value: clusters_json_1.default[0].username
            },
            {
                type: 'raw',
                value: 'sdk_test_job' + randomString.get()
            },
            {
                type: 'raw',
                value: executionType
            }
        ]
    };
}
/**
 * API default test cases will be add to the test case generator.
 */
exports.ApiDefaultTestCases = {
    'get /api/v2/tokens': {
        before: [{
                tag: 'token',
                operationId: 'createApplicationToken'
            }],
        tests: [
            {
                description: 'Get tokens with user token'
            },
            {
                description: 'Get tokens with unauthorized token',
                customizedTest: 'getTokensWithUnauthorizedUser'
            }
        ],
        after: [{
                tag: 'token',
                operationId: 'deleteToken',
                parameters: [{
                        type: 'fromResult',
                        resultType: 'beforeResults',
                        resultPath: ['token'],
                        resultIndex: 0
                    }]
            }]
    },
    'delete /api/v2/tokens/{token}': {
        before: [{
                tag: 'token',
                operationId: 'createApplicationToken'
            }],
        tests: [{
                operation: {
                    parameters: [{
                            type: 'fromResult',
                            resultType: 'beforeResults',
                            resultPath: ['token'],
                            resultIndex: 0
                        }]
                }
            }]
    },
    'post /api/v2/tokens/application': {
        tests: [{}],
        after: [{
                tag: 'token',
                operationId: 'deleteToken',
                parameters: [{
                        type: 'fromResult',
                        resultType: 'testResults',
                        resultPath: ['token'],
                        resultIndex: 0
                    }]
            }]
    },
    'get /api/v2/users/{user}': {
        tests: [{
                operation: {
                    parameters: [{
                            type: 'raw',
                            value: clusters_json_1.default[0].username
                        }]
                }
            }]
    },
    'post /api/v2/groups': {
        tests: [{
                operation: createTestGroup
            }],
        after: [deleteTestGroup]
    },
    'put /api/v2/groups': {
        before: [createTestGroup],
        tests: [{
                operation: {
                    parameters: [{
                            type: 'raw',
                            value: {
                                data: {
                                    groupname: 'sdktestgroup',
                                    description: 'test update group'
                                },
                                patch: true
                            }
                        }]
                }
            }],
        after: [deleteTestGroup]
    },
    'get /api/v2/groups/{group}': {
        before: [createTestGroup],
        tests: [{
                operation: {
                    parameters: [{
                            type: 'raw',
                            value: 'sdktestgroup'
                        }]
                }
            }],
        after: [deleteTestGroup]
    },
    'delete /api/v2/groups/{group}': {
        before: [createTestGroup],
        tests: [{
                operation: deleteTestGroup
            }]
    },
    'get /api/v2/virtual-clusters/{vc}': {
        tests: [{
                operation: {
                    parameters: [{
                            type: 'raw',
                            value: 'default'
                        }]
                }
            }]
    },
    'get /api/v2/virtual-clusters/{vc}/sku-types': {
        tests: [{
                operation: {
                    parameters: [{
                            type: 'raw',
                            value: 'default'
                        }]
                }
            }]
    },
    'get /api/v2/storages/{storage}': {
        before: [{
                tag: 'storage',
                operationId: 'getStorages'
            }],
        tests: [{
                operation: {
                    parameters: [{
                            type: 'fromResult',
                            resultType: 'beforeResults',
                            resultPath: ['storages', 0, 'name'],
                            resultIndex: 0
                        }]
                }
            }]
    },
    'post /api/v2/jobs': {
        tests: [{
                operation: createTestJob()
            }],
        after: [updateTestJobExecutionType('STOP')]
    },
    'get /api/v2/jobs/{user}~{job}': {
        before: [createTestJob()],
        tests: [{
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: clusters_json_1.default[0].username
                        },
                        {
                            type: 'raw',
                            value: 'sdk_test_job' + randomString.get()
                        }
                    ]
                }
            }],
        after: [updateTestJobExecutionType('STOP')]
    },
    'get /api/v2/jobs/{user}~{job}/config': {
        before: [createTestJob()],
        tests: [{
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: clusters_json_1.default[0].username
                        },
                        {
                            type: 'raw',
                            value: 'sdk_test_job' + randomString.get()
                        }
                    ]
                }
            }],
        after: [updateTestJobExecutionType('STOP')]
    },
    'put /api/v2/jobs/{user}~{job}/exectionType': {
        before: [createTestJob()],
        tests: [
            {
                description: 'update job execution type to STOP',
                operation: updateTestJobExecutionType('STOP')
            }, {
                description: 'update job execution type to START',
                operation: updateTestJobExecutionType('START')
            }
        ],
        after: [updateTestJobExecutionType('STOP')]
    },
    'get /api/v2/jobs/{user}~{job}/job-attempts': {
        before: [createTestJob()],
        tests: [{
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: clusters_json_1.default[0].username
                        },
                        {
                            type: 'raw',
                            value: 'sdk_test_job' + randomString.get()
                        }
                    ]
                }
            }],
        after: [updateTestJobExecutionType('STOP')]
    },
    'get /api/v2/jobs/{user}~{job}/job-attempts/{attemptIndex}': {
        before: [createTestJob()],
        tests: [{
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: clusters_json_1.default[0].username
                        },
                        {
                            type: 'raw',
                            value: 'sdk_test_job' + randomString.get()
                        },
                        {
                            type: 'raw',
                            value: 0
                        }
                    ]
                }
            }],
        after: [updateTestJobExecutionType('STOP')]
    }
};
/**
 * Customized tests
 */
class CustomizedTestsClass {
    constructor() {
        this.ajvInstance = new ajv_1.default({ nullable: true });
    }
    async getTokensWithUnauthorizedUser(test, operationResults) {
        const client = new clients_1.TokenClient({
            token: 'unauthorized user token',
            https: true,
            rest_server_uri: clusters_json_1.default[0].rest_server_uri
        });
        chai_1.expect(await client.getTokens()).to.throw(paiJobErrors_js_1.UnauthorizedUserError);
    }
}
exports.CustomizedTests = new CustomizedTestsClass();
