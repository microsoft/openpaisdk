"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@pai/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const nock = require("nock");
/**
 * Unit tests for authnClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
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
    const response = {
        authn_type: 'basic',
        loginURI: '/api/v1/authn/basic/login',
        loginURIMethod: 'post'
    };
    before(() => nock(`http://${testUri}`).get('/api/v1/authn/info').reply(200, response));
    it('should return the user info', async () => {
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.info();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Basic login', () => {
    const response = {
        token: 'token'
    };
    it('should return the login info', async () => {
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.login();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('OIDC login', () => {
    it('should return something', async () => {
        nock(`http://${testUri}`).get('/api/v1/authn/oidc/login').reply(200, 'test');
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.oidcLogin();
        chai_1.expect(result).to.be.a('string');
    });
});
describe('OIDC logout', () => {
    it('should return something', async () => {
        nock(`http://${testUri}`).get('/api/v1/authn/oidc/logout').reply(200, 'test');
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.oidcLogout();
        chai_1.expect(result).to.be.a('string');
    });
});
