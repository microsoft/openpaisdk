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
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const request = __importStar(require("request-promise-native"));
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
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/info`);
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
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/login?${queryString}`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/login`);
        // tslint:disable-next-line:no-unnecessary-local-variable
        const res = await request.get(url);
        return res;
    }
    /**
     * OpenID Connect logout.
     */
    async oidcLogout(queryString) {
        const url = queryString ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/logout?${queryString}`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/logout`);
        // tslint:disable-next-line:no-unnecessary-local-variable
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
