"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const util_1 = require("../commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Authn client.
 */
class AuthnClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get authn information.
     */
    async info() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/authn/info`);
        if (this.authnInfo === undefined) {
            this.authnInfo = JSON.parse(await request.get(url));
        }
        return this.authnInfo;
    }
    /**
     * OpenID Connect login.
     */
    async oidcLogin(queryString) {
        const url = queryString ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/authn/oidc/login?${queryString}`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/authn/oidc/login`);
        const res = await request.get(url);
        return res;
    }
    /**
     * OpenID Connect logout.
     */
    async oidcLogout(queryString) {
        const url = queryString ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/authn/oidc/logout?${queryString}`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/authn/oidc/logout`);
        const res = await request.get(url);
        return res;
    }
    /**
     * Get list of available tokens (portal token + application token).
     */
    async getTokens(token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    /**
     * Create an application access token.
     */
    async createApplicationToken(token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token/application`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.post(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    /**
     * Revoke a token.
     */
    async deleteToken(deleteToken, accessToken) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token/${deleteToken}`);
        if (accessToken === undefined) {
            accessToken = await super.token();
        }
        const res = await request.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
}
exports.AuthnClient = AuthnClient;
