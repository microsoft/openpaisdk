// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenPAIClient } from '@api/v2';
import { Ajv } from 'ajv';
import { expect } from 'chai';
import nock from 'nock';

import { IApiOperation } from './apiTestCaseGenerator';

export interface IOperationResults {
    beforeEachResults: any[];
    beforeResults: any[];
    testResults: any[];
}

/**
 * Api test runner.
 */
export class ApiTestRunner {
    private openPAIClient: any;
    private map: {
        [key: string]: any;
    } = {};
    private ajvInstance: Ajv;
    private mock: any;

    constructor(
        openPAIClient: OpenPAIClient, ajvInstance: Ajv, map?: any, mock?: any
    ) {
        this.openPAIClient = openPAIClient;
        this.ajvInstance = ajvInstance;
        this.map = map;
        this.mock = mock;
    }

    public getClientName(tag: string): string {
        const words: string[] = tag.split(' ');
        if (words.length === 1) {
            return tag;
        }

        return words[0] + words[1].charAt(0).toUpperCase() + words[1].slice(1);
    }

    public async runOperation(
        operation: IApiOperation, operationResults?: IOperationResults
    ): Promise<any> {
        if (this.mock) {
            this.mockExample(operation);
        }

        const client: any = operation.cluster ?
            (new OpenPAIClient(operation.cluster) as any)[operation.tag!] :
            this.openPAIClient[this.getClientName(operation.tag!)];
        const parameters: any[] = [];
        if (operation.parameters) {
            for (const para of operation.parameters) {
                if (para.type === 'raw') {
                    parameters.push(para.value);
                } else  if (operationResults) {
                    let parameter: any = operationResults[para.resultType!][para.resultIndex!];
                    if (para.resultPath) {
                        for (const item of para.resultPath) {
                            if (parameter) {
                                parameter = parameter[item];
                            } else {
                                return;
                            }
                        }
                    }
                    if (!parameter) {
                        return;
                    }
                    parameters.push(parameter);
                }
            }
        }

        let res: any;
        try {
            res = await client[operation.operationId!](...parameters);
        } catch (err) {
            if (err !== undefined && operation.response!.statusCode !== err.status) {
                throw err;
            } else {
                res = err.data;
            }
        }

        if (operation.response) {
            if (operation.response.schema) {
                const valid: boolean = this.ajvInstance.validate(operation.response.schema, res) as boolean;
                if (!valid) {
                    console.log(this.ajvInstance.errors);
                }
                expect(valid, 'response should be valid.').to.be.true();
            }
            if (operation.response.expectResult) {
                for (const key of Object.keys(operation.response.expectResult)) {
                    expect(res[key]).to.be.eq(operation.response.expectResult[key]);
                }
            }
        }

        return res;
    }

    public async runOperations(
        operations?: IApiOperation[], operationResults?: IOperationResults
    ): Promise<any> {
        const result: any[] = [];
        if (operations) {
            for (const operation of operations) {
                const res: any = await this.runOperation(operation, operationResults);
                if (res) {
                    result.push(res);
                }
            }
        }
        return result;
    }

    private mockExample(operation: IApiOperation): void {
        const op: any = this.map[operation.operationId!];
        let example: any = {};
        if (this.mock.operations &&
            this.mock.operations[operation.operationId!] &&
            this.mock.operations[operation.operationId!].example
        ) {
            example = this.mock.operations[operation.operationId!].example;
        } else {
            if (operation.response) {
                example = {
                    code: operation.response!.statusCode!,
                    data: operation.response.expectResult ||
                        op.examples[operation.response!.statusCode!] || {}
                };
            } else {
                for (const code of Object.keys(op.examples)) {
                    if (code.startsWith('20')) {
                        example = {
                            code: Number(code),
                            data: op.examples[code]
                        };
                    }
                }
            }
        }
        let pathString: string = op.path.replace(new RegExp('{(.*)}', 'gi'), '(.*)');
        if (pathString.endsWith('/')) {
            pathString = pathString.substring(0, pathString.lastIndexOf('/'));
        }
        const mockPath: RegExp = new RegExp(pathString);
        (nock(this.mock.rest_server_uri) as any)[op.method](mockPath).reply(
            example.code, example.data
        );
    }
}
