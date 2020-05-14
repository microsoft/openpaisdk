// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import swaggerParser from '@apidevtools/swagger-parser';
import { IPAICluster } from '@pai/api/v2';
import * as fs from 'fs';

import { ApiDefaultTestCases } from './apiTestCases';

/**
 * Generate test cases from swagger.
 * e.g. ts-node .\apiTestCaseGenerator.ts -- "../../src/api/v2/swagger.yaml" "./apiTestCase.json"
 */
export class ApiTestCaseGenerator {
    public async generate(
        swaggerPath: string = 'src/api/v2/swagger.yaml', outputPath?: string
    ): Promise<IApiTestCase[]> {
        const api: any = await swaggerParser.dereference(swaggerPath);
        const tests: IApiTestCase[] = [];

        for (const path of Object.keys(api.paths)) {
            const ops: any = api.paths[path];
            for (const type of Object.keys(ops)) {
                if (type === 'parameters') {
                    continue;
                }

                const responseCodes: string[] = Object.keys(ops[type].responses);
                const correctCode: string | undefined =
                    responseCodes.find(code => code.startsWith('20'));
                let testResponse: any;
                if (correctCode !== undefined) {
                    testResponse = {
                        statusCode: correctCode
                    };
                    const correctResponse: any = ops[type].responses[correctCode];
                    if (correctResponse.content) {
                        for (const contentType of Object.keys(correctResponse.content)) {
                            if (correctResponse.content[contentType].schema) {
                                testResponse.schema = correctResponse.content[contentType].schema;
                                testResponse.contentType = contentType;
                            }
                        }
                    }
                }

                const testName: string = `${type} ${path}`;
                const test: IApiTestCase =
                    ApiDefaultTestCases[testName] ||
                    {
                        description: testName,
                        tests: [{}]
                    };

                if (!test.schemas) {
                    test.schemas = {};
                }
                responseCodes.forEach(code => {
                    if (!test.schemas![code]) {
                        test.schemas![code] = ops[type].responses[code];
                    }
                });

                if (!test.description) {
                    test.description = testName;
                }

                for (const item of test.tests) {
                    if (!item.operation) {
                        item.operation = {};
                    }
                    if (!item.operation.tag) {
                        item.operation.tag = ops[type].tags[0];
                    }
                    if (!item.operation.operationId) {
                        item.operation.operationId = ops[type].operationId;
                    }
                    if (!item.operation.parameters) {
                        item.operation.parameters = [];
                    }
                    if (!item.operation.response) {
                        item.operation.response = testResponse;
                    } else {
                        if (item.operation.response.statusCode !== undefined && !item.operation.response.schema) {
                            item.operation.response.schema = test.schemas![
                                item.operation.response.statusCode
                            ];
                        }
                    }
                }

                tests.push(test);
            }
        }

        if (outputPath) {
            fs.writeFileSync(outputPath, JSON.stringify(tests));
        }

        return tests;
    }
}

export interface IApiOperationParameter {
    type: 'raw' | 'fromResult';
    value?: any;
    resultType?: 'beforeEachResults' | 'beforeResults' | 'testResults';
    resultPath?: any[];
    resultIndex?: number;
}

export interface IApiOperation {
    tag?: string;
    operationId?: string;
    cluster?: IPAICluster;
    parameters?: IApiOperationParameter[];
    response?: {
        statusCode?: number;
        schema?: any;
        contentType?: string;
        expectResult?: any;
    };
}

export interface IApiTestItem {
    description?: string;
    before?: IApiOperation[];
    operation?: IApiOperation;
    after?: IApiOperation[];

    /**
     * Reference to the method name in CustomizedTests class,
     * will skip other operations (before, operation, after)
     */
    customizedTest?: string;
}

export interface IApiTestCase {
    description?: string;
    beforeEach?: IApiOperation[];
    before?: IApiOperation[];
    tests: IApiTestItem[];
    after?: IApiOperation[];
    afterEach?: IApiOperation[];
    schemas?: { [key: string]: any };
}

const generator: ApiTestCaseGenerator = new ApiTestCaseGenerator();
if (process.argv.length !== 5) {
    console.log('parameters should contain <swagger path> and <output path> after "--".');
    console.log('e.g. ts-node apiTestCaseGenerator.ts -- <swagger path> <output path>');
} else {
    generator
        .generate(process.argv[3], process.argv[4])
        .then(() => console.log('Success.'))
        .catch(err => console.log(err));
}
