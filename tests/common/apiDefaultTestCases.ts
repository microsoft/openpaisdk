// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IApiTestCase } from './apiTestCaseGenerator';

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
    }
};
