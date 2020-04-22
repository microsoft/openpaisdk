"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Api client.
 */
class TokenClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get your currently signed tokens.
     */
    async getTokens() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/tokens`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Revoke a token.
     * @param deleteToken The token string.
     */
    async deleteToken(deleteToken) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/tokens/${deleteToken}`, this.cluster.https);
        return await this.httpClient.delete(url);
    }
    /**
     * Create an application access token in the system.
     */
    async createApplicationToken() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/tokens/application`, this.cluster.https);
        return await this.httpClient.post(url, {});
    }
}
exports.TokenClient = TokenClient;
