// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, OpenPAIBaseClient } from '@api/v2';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

/**
 * Unit tests for baseClient.
 */
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

describe('parse uri', () => {
    it('should parse pai uri', () => {
        const check: any = (input: IPAICluster, expected: IPAICluster) => {
            const result: IPAICluster = OpenPAIBaseClient.parsePaiUri(input);
            expect(result).to.be.eql(expected);
        };
        check(
            { pai_uri: 'https://test.uri/' },
            { pai_uri: 'https://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: true }
        );
        check(
            { pai_uri: 'http://test.uri/' },
            { pai_uri: 'http://test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false }
        );
        check(
            { pai_uri: 'test.uri/' },
            { pai_uri: 'test.uri/', alias: 'test.uri', rest_server_uri: 'test.uri/rest-server', https: false }
        );
        check(
            { pai_uri: 'test.uri/', alias: 'test' },
            { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false }
        );
        check(
            { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: '' },
            { pai_uri: 'test.uri/', alias: 'test', rest_server_uri: 'test.uri/rest-server', https: false }
        );
        check(
            { pai_uri: 'test.uri:8080/' },
            { pai_uri: 'test.uri:8080/', alias: 'test.uri', rest_server_uri: 'test.uri:8080/rest-server', https: false }
        );
    });
});
