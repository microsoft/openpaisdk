// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthnClient, IAuthnInfo, IPAICluster } from '@api/v2';
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

/**
 * Unit tests for authnClient.
 */
const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => {
    nock(`http://${testUri}`).post('/api/v1/token').reply(200, { token: 'token' });
    nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
});

describe('Get authn infomation', () => {
    const response: IAuthnInfo = {
        authn_type: 'basic',
        loginURI: '/api/v2/authn/basic/login',
        loginURIMethod: 'post'
    };
    before(() =>
        nock(`http://${testUri}`).get('/api/v2/authn/info').reply(200, response)
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
        nock(`http://${testUri}`).get('/api/v2/authn/oidc/login').reply(200, 'test');
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: any = await authnClient.oidcLogin();

        expect(result).to.be.a('string');
    });
});

describe('OIDC logout', () => {
    it('should return something', async () => {
        nock(`http://${testUri}`).get('/api/v2/authn/oidc/logout').reply(200, 'test');
        const authnClient: AuthnClient = new AuthnClient(cluster);
        const result: any = await authnClient.oidcLogout();

        expect(result).to.be.a('string');
    });
});
