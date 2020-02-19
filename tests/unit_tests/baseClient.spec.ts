// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// tslint:disable-next-line:missing-jsdoc
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

import { IPAICluster } from '../../src';
import { OpenPAIBaseClient } from '../../src/client/baseClient';

const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);

describe('Get token', () => {
    const response: any = {
        token: 'eyJhb...'
    };
    before(() => nock(`http://${testUri}`).post('/api/v1/token').reply(200, response));

    it('should return a token', async () => {
        const baseClient: OpenPAIBaseClient = new OpenPAIBaseClient(cluster);
        const result: any = await baseClient.token();
        expect(result).to.be.a('string');
    });
});

describe('Get cluster info', () => {
    const response: any = {
        authnMethod: 'basic',
        launcherType: 'yarn',
        name: 'PAI RESTful API',
        version: 'v0.14.0'
    };
    before(() => nock(`http://${testUri}`).get('/api/v1/').reply(200, response));

    it('should return the cluster info', async () => {
        const baseClient: OpenPAIBaseClient = new OpenPAIBaseClient(cluster);
        const result: any = await baseClient.getClusterInfo();
        expect(result).to.be.eql(response);
    });
});

describe('parse uri', () => {
    it('should parse pai uri', () => {
        let check = (input: IPAICluster, expected: IPAICluster) => {
            const result = OpenPAIBaseClient.parsePaiUri(input);
            expect(result).to.be.eql(expected);
        };
        check({ pai_uri: 'https://test.uri/' }, { pai_uri: 'https://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: true });
        check({ pai_uri: 'http://test.uri/' }, { pai_uri: 'http://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/' }, { pai_uri: 'test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/', alias: 'test' }, { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri/', alias: 'test', rest_server_uri: '' }, { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false });
        check({ pai_uri: 'test.uri:8080/' }, { pai_uri: 'test.uri:8080/', alias: 'test.uri', rest_server_uri: 'test.uri:8080/rest-server', https: false });
    });
});