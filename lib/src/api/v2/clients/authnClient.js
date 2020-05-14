"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Authn client.
 */
class AuthnClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * User login with Azure AD.
     */
    async oidcLogin(queryString) {
        return await this.oidcRequest('login', queryString);
    }
    /**
     * User logout from Azure AD.
     */
    async oidcLogout(queryString) {
        return await this.oidcRequest('logout', queryString);
    }
    /**
     * Get an access token using username and password.
     * @param username Username, set undefined to use the username in cluster setting.
     * @param password Password, set undefined to use the password in cluster setting.
     */
    async basicLogin(username, password) {
        return await this.httpClient.login(username, password);
    }
    /**
     * Revoke current login token.
     */
    async basicLogout() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/basic/logout`, this.cluster.https);
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
