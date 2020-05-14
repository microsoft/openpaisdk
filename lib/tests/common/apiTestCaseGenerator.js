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
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const fs = __importStar(require("fs"));
const apiTestCases_1 = require("./apiTestCases");
/**
 * Generate test cases from swagger.
 * e.g. ts-node .\apiTestCaseGenerator.ts -- "../../src/api/v2/swagger.yaml" "./apiTestCase.json"
 */
class ApiTestCaseGenerator {
    async generate(swaggerPath = 'src/api/v2/swagger.yaml', outputPath) {
        const api = await swagger_parser_1.default.dereference(swaggerPath);
        const tests = [];
        for (const path of Object.keys(api.paths)) {
            const ops = api.paths[path];
            for (const type of Object.keys(ops)) {
                if (type === 'parameters') {
                    continue;
                }
                const responseCodes = Object.keys(ops[type].responses);
                const correctCode = responseCodes.find(code => code.startsWith('20'));
                let testResponse;
                if (correctCode !== undefined) {
                    testResponse = {
                        statusCode: correctCode
                    };
                    const correctResponse = ops[type].responses[correctCode];
                    if (correctResponse.content) {
                        for (const contentType of Object.keys(correctResponse.content)) {
                            if (correctResponse.content[contentType].schema) {
                                testResponse.schema = correctResponse.content[contentType].schema;
                                testResponse.contentType = contentType;
                            }
                        }
                    }
                }
                const testName = `${type} ${path}`;
                const test = apiTestCases_1.ApiDefaultTestCases[testName] ||
                    {
                        description: testName,
                        tests: [{}]
                    };
                if (!test.schemas) {
                    test.schemas = {};
                }
                responseCodes.forEach(code => {
                    if (!test.schemas[code]) {
                        test.schemas[code] = ops[type].responses[code];
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
                    }
                    else {
                        if (item.operation.response.statusCode !== undefined && !item.operation.response.schema) {
                            item.operation.response.schema = test.schemas[item.operation.response.statusCode];
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
exports.ApiTestCaseGenerator = ApiTestCaseGenerator;
const generator = new ApiTestCaseGenerator();
if (process.argv.length !== 5) {
    console.log('parameters should contain <swagger path> and <output path> after "--".');
    console.log('e.g. ts-node apiTestCaseGenerator.ts -- <swagger path> <output path>');
}
else {
    generator
        .generate(process.argv[3], process.argv[4])
        .then(() => console.log('Success.'))
        .catch(err => console.log(err));
}
