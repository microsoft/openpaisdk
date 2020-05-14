"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../../src/api/v2");
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const nock_1 = __importDefault(require("nock"));
/**
 * Unit tests for baseClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirty_chai_1.default);
describe('Get token', () => {
    const response = {
        token: 'eyJhb...'
    };
    before(() => nock_1.default(`http://${testUri}`).post('/api/v1/token').reply(200, response));
    it('should return a token', async () => {
        const baseClient = new v2_1.OpenPAIBaseClient(cluster);
        const result = await baseClient.getToken();
        chai_1.expect(result).to.be.a('string');
    });
});
describe('parse uri', () => {
    it('should parse pai uri', () => {
        const check = (input, expected) => {
            const result = v2_1.OpenPAIBaseClient.parsePaiUri(input);
            chai_1.expect(result).to.be.eql(expected);
        };
        check({ pai_uri: 'https://test.uri/' }, { pai_uri: 'https://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: true });
        check({ pai_uri: 'http://test.uri/' }, { pai_uri: 'http://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/' }, { pai_uri: 'test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/', alias: 'test' }, { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/', alias: 'test', rest_server_uri: '' }, { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri:8080/' }, { pai_uri: 'test.uri:8080/', alias: 'test.uri', rest_server_uri: 'test.uri:8080/rest-server', https: false });
    });
});
