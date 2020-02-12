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

import { AuthnClient, IAuthnInfo, IPAICluster } from '../../src';

const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => {
    nock(`http://${testUri}`).post('/api/v1/token').reply(200, { token: 'token' });
    nock(`http://${testUri}`).post('/api/v1/authn/basic/login').reply(200, { token: 'token' });
});

describe('Get authn infomation', () => {
    const response: IAuthnInfo = {
        authn_type: 'basic',
        loginURI: '/api/v1/authn/basic/login',
        loginURIMethod: 'post'
    };
    before(() =>
        nock(`http://${testUri}`).get('/api/v1/authn/info').reply(200, response)
    );

    it('should return the user info', async () => {
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: IAuthnInfo = await authnClient.info();
        expect(result).to.be.eql(response);
    });
});

describe('Basic login', () => {
    const response: any = {
        token: 'token'
    };

    it('should return the login info', async () => {
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: any = await authnClient.login();
        expect(result).to.be.eql(response);
    });
});

describe('OIDC login', () => {
    it('should return something', async () => {
        nock(`http://${testUri}`).get('/api/v1/authn/oidc/login').reply(200, 'test');
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: any = await authnClient.oidcLogin();

        expect(result).to.be.a('string');
    });
});

describe('OIDC logout', () => {
    it('should return something', async () => {
        nock(`http://${testUri}`).get('/api/v1/authn/oidc/logout').reply(200, 'test');
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: any = await authnClient.oidcLogout();

        expect(result).to.be.a('string');
    });
});
