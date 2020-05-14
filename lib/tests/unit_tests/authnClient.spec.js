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
 * Unit tests for authnClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirty_chai_1.default);
beforeEach(() => {
    nock_1.default(`http://${testUri}`).post('/api/v1/token').reply(200, { token: 'token' });
    nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
});
describe('Basic login', () => {
    const response = {
        token: 'token'
    };
    it('should return the login info', async () => {
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.basicLogin();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('OIDC login', () => {
    it('should return something', async () => {
        nock_1.default(`http://${testUri}`).get('/api/v2/authn/oidc/login').reply(200, 'test');
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.oidcLogin();
        chai_1.expect(result).to.be.a('string');
    });
});
describe('OIDC logout', () => {
    it('should return something', async () => {
        nock_1.default(`http://${testUri}`).get('/api/v2/authn/oidc/logout').reply(200, 'test');
        const authnClient = new v2_1.AuthnClient(cluster);
        const result = await authnClient.oidcLogout();
        chai_1.expect(result).to.be.a('string');
    });
});
