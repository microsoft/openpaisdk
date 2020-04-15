"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Authn client.
 */
class AuthnClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    async login() {
        return await this.httpClient.login();
    }
    /**
     * Get authn information.
     */
    async info() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/info`, this.cluster.https);
        if (this.authnInfo === undefined) {
            this.authnInfo = await this.httpClient.get(url);
        }
        return this.authnInfo;
    }
    /**
     * OpenID Connect login.
     */
    async oidcLogin(queryString) {
        return await this.oidcRequest('login', queryString);
    }
    /**
     * OpenID Connect logout.
     */
    async oidcLogout(queryString) {
        return await this.oidcRequest('logout', queryString);
    }
    /**
     * Get list of available tokens (portal token + application token).
     */
    async getTokens() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/tokens`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Create an application access token.
     */
    async createApplicationToken() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/tokens/application`, this.cluster.https);
        return await this.httpClient.post(url, {});
    }
    /**
     * Revoke a token.
     */
    async deleteToken(deleteToken, accessToken) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token/${deleteToken}`, this.cluster.https);
        return await this.httpClient.delete(url);
    }
    async oidcRequest(req, queryString) {
        const url = queryString ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/${req}?${queryString}`, this.cluster.https) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/${req}`, this.cluster.https);
        return await this.httpClient.get(url, {
            200: (data) => data
        });
    }
}
exports.AuthnClient = AuthnClient;
