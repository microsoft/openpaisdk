// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import clustersJson from '../../.tests/clusters.json';

import { IApiOperation, IApiTestCase } from './apiTestCaseGenerator';

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

/**
 * API default test cases will be add to the test case generator.
 */
export const ApiDefaultTestCases: {[key: string]: IApiTestCase} = {
    'delete /api/v2/tokens/{token}': {
        before: [{
            tag: 'token',
            operationId: 'createApplicationToken',
            parameters: []
        }],
        tests: [{
            operation: {
                parameters: [{
                    type: 'fromResult',
                    resultType: 'beforeResults',
                    resultPath: 'token',
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
                resultPath: 'token',
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
                        groupname: 'sdktestgroup',
                        description: 'test update group'
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
    }
};
