// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenClient } from '@pai/api/v2/clients';
import { UnauthorizedUserError } from '@pai/commom/errors/paiJobErrors';
import ajv, { Ajv } from 'ajv';
import { expect } from 'chai';
import crypto from 'crypto';

import clustersJson from '../../.tests/clusters.json';
import { IOperationResults } from '../api_tests/v2/api.v2.spec';

import { IApiOperation, IApiTestCase, IApiTestItem } from './apiTestCaseGenerator';
import { testJobConfig } from './test_data/testJobConfig';

/**
 * Random string class.
 */
class RandomString {
    private data?: string;

    public get(): string {
        if (this.data) {
            return this.data;
        } else {
            return this.new();
        }
    }

    public new(): string {
        this.data = crypto.randomBytes(4).toString('hex');
        return this.data;
    }
}

const randomString: RandomString = new RandomString();

const createTestUser: IApiOperation = {
    tag: 'user',
    operationId: 'createUser',
    parameters: [{
        type: 'raw',
        value: {
            username: 'sdk_test_user',
            password: 'test_password'
        }
    }]
};

const deleteTestUser: IApiOperation = {
    tag: 'user',
    operationId: 'deleteUser',
    parameters: [{
        type: 'raw',
        value: 'sdk_test_user'
    }]
};

const createTestGroup: IApiOperation = {
    tag: 'group',
    operationId: 'createGroup',
    parameters: [{
        type: 'raw',
        value: {
            groupname: 'sdktestgroup'
        }
    }]
};

const deleteTestGroup: IApiOperation = {
    tag: 'group',
    operationId: 'deleteGroup',
    parameters: [{
        type: 'raw',
        value: 'sdktestgroup'
    }]
};

function createTestJob(): IApiOperation {
    return {
        tag: 'job',
        operationId: 'createJob',
        parameters: [{
            type: 'raw',
            value: {
                ...testJobConfig,
                ...{ name: 'sdk_test_job' + randomString.new() }
            }
        }]
    };
}

function updateTestJobExecutionType(executionType: 'START' | 'STOP'): IApiOperation {
    return {
        tag: 'job',
        operationId: 'updateJobExecutionType',
        parameters: [
            {
                type: 'raw',
                value: clustersJson[0].username
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
export const ApiDefaultTestCases: {[key: string]: IApiTestCase} = {
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
                    value: clustersJson[0].username
                }]
            }
        }]
    },
    'post /api/v2/users': {
        tests: [{
            operation: createTestUser
        }],
        after: [ deleteTestUser ]
    },
    'put /api/v2/users': {
        before: [ createTestUser ],
        tests: [
            {
                description: 'patch: true',
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: {
                                username: 'sdk_test_user',
                                email: 'new_email@test1.com'
                            }
                        }
                    ]
                }
            },
            {
                description: 'patch: false',
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: {
                                username: 'sdk_test_user',
                                email: 'new_email@test2.com',
                                virtualCluster: ['default'],
                                admin: false,
                                password: 'new_test_password',
                                extension: {}
                            }
                        },
                        {
                            type: 'raw',
                            value: false
                        }
                    ]
                }
            }
        ],
        after: [ deleteTestUser ]
    },
    'put /api/v2/users/me': {
        tests: [
            {
                description: 'patch: true',
                operation: {
                    parameters: [{
                        type: 'raw',
                        value: {
                            username: clustersJson[0].username,
                            email: 'new_email@test1.com'
                        }
                    }]
                }
            },
            {
                description: 'patch: false',
                operation: {
                    parameters: [
                        {
                            type: 'raw',
                            value: {
                                username: clustersJson[0].username,
                                email: 'new_email@test2.com',
                                oldPassword: clustersJson[0].password,
                                newPassword: clustersJson[0].password
                            }
                        },
                        {
                            type: 'raw',
                            value: false
                        }
                    ]
                }
            }
        ]
    },
    'post /api/v2/groups': {
        tests: [{
            operation: createTestGroup
        }],
        after: [ deleteTestGroup ]
    },
    'put /api/v2/groups': {
        before: [ createTestGroup ],
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
        after: [ deleteTestGroup ]
    },
    'get /api/v2/groups/{group}': {
        before: [ createTestGroup ],
        tests: [{
            operation: {
                parameters: [{
                    type: 'raw',
                    value: 'sdktestgroup'
                }]
            }
        }],
        after: [ deleteTestGroup ]
    },
    'delete /api/v2/groups/{group}': {
        before: [ createTestGroup ],
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
        after: [ updateTestJobExecutionType('STOP') ]
    },
    'get /api/v2/jobs/{user}~{job}': {
        before: [ createTestJob() ],
        tests: [{
            operation: {
                parameters: [
                    {
                        type: 'raw',
                        value: clustersJson[0].username
                    },
                    {
                        type: 'raw',
                        value: 'sdk_test_job' + randomString.get()
                    }
                ]
            }
        }],
        after: [ updateTestJobExecutionType('STOP') ]
    },
    'get /api/v2/jobs/{user}~{job}/config': {
        before: [ createTestJob() ],
        tests: [{
            operation: {
                parameters: [
                    {
                        type: 'raw',
                        value: clustersJson[0].username
                    },
                    {
                        type: 'raw',
                        value: 'sdk_test_job' + randomString.get()
                    }
                ]
            }
        }],
        after: [ updateTestJobExecutionType('STOP') ]
    },
    'put /api/v2/jobs/{user}~{job}/exectionType': {
        before: [ createTestJob() ],
        tests: [
            {
                description: 'update job execution type to STOP',
                operation: updateTestJobExecutionType('STOP')
            }, {
                description: 'update job execution type to START',
                operation: updateTestJobExecutionType('START')
            }
        ],
        after: [ updateTestJobExecutionType('STOP') ]
    },
    'get /api/v2/jobs/{user}~{job}/job-attempts': {
        before: [ createTestJob() ],
        tests: [{
            operation: {
                parameters: [
                    {
                        type: 'raw',
                        value: clustersJson[0].username
                    },
                    {
                        type: 'raw',
                        value: 'sdk_test_job' + randomString.get()
                    }
                ]
            }
        }],
        after: [ updateTestJobExecutionType('STOP') ]
    },
    'get /api/v2/jobs/{user}~{job}/job-attempts/{attemptIndex}': {
        before: [ createTestJob() ],
        tests: [{
            operation: {
                parameters: [
                    {
                        type: 'raw',
                        value: clustersJson[0].username
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
        after: [ updateTestJobExecutionType('STOP') ]
    }
};

/**
 * Customized tests
 */
class CustomizedTestsClass {
    private readonly ajvInstance: Ajv = new ajv({ nullable: true });

    public async getTokensWithUnauthorizedUser(
        test: IApiTestItem, operationResults?: IOperationResults
    ): Promise<void> {
        const client: TokenClient = new TokenClient({
            token: 'unauthorized user token',
            https: true,
            rest_server_uri: clustersJson[0].rest_server_uri
        });

        expect(await client.getTokens()).to.throw(UnauthorizedUserError);
    }
}

export const CustomizedTests: CustomizedTestsClass = new CustomizedTestsClass();
