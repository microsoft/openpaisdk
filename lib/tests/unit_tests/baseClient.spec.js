"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@api/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const nock = require("nock");
/**
 * Unit tests for baseClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirtyChai);
describe('Get token', () => {
    const response = {
        token: 'eyJhb...'
    };
    before(() => nock(`http://${testUri}`).post('/api/v1/token').reply(200, response));
    it('should return a token', async () => {
        const baseClient = new v2_1.OpenPAIBaseClient(cluster);
        const result = await baseClient.token();
        chai_1.expect(result).to.be.a('string');
    });
});
describe('Get cluster info', () => {
    const response = {
        authnMethod: 'basic',
        launcherType: 'yarn',
        name: 'PAI RESTful API',
        version: 'v0.14.0'
    };
    before(() => nock(`http://${testUri}`).get('/api/v2/info').reply(200, response));
    it('should return the cluster info', async () => {
        const baseClient = new v2_1.OpenPAIBaseClient(cluster);
        const result = await baseClient.config.clusterInfo();
        chai_1.expect(result).to.be.eql(response);
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
