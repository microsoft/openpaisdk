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
const url_1 = require("url");
/**
 * OpenPAI basic client.
 */
class OpenPAIBaseClient {
    constructor(cluster) {
        /**
         * get cluster configuration / info
         */
        this.config = {
            /**
             * username from cluster config
             */
            username: () => {
                return this.cluster.username;
            },
            /**
             * Get OpenPAI cluster info, will call /api/v1.
             */
            clusterInfo: async () => {
                const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/`);
                const res = await request.get(url);
                return JSON.parse(res);
            }
        };
        this.cluster = OpenPAIBaseClient.parsePaiUri(cluster);
    }
    /**
     * parse information from pai_uri
     * refer to tests/unit_tests/baseClient.spec.ts
     */
    static parsePaiUri(cluster) {
        if (cluster.pai_uri) {
            const paiUri = new url_1.URL(util_1.Util.fixUrl(cluster.pai_uri));
            if (!cluster.https) {
                cluster.https = paiUri.protocol === 'https:';
            }
            if (!cluster.rest_server_uri) {
                cluster.rest_server_uri = paiUri.host + '/rest-server';
            }
            if (!cluster.alias) {
                cluster.alias = paiUri.hostname;
            }
        }
        return cluster;
    }
    /**
     * Get OpenPAI access token, will call /api/v1/token.
     */
    async token() {
        if (this.cluster.token) {
            return this.cluster.token;
        }
        else if (!this.cacheToken || this.cacheToken.expireTime < Date.now()) {
            const res = await this.login();
            this.cacheToken = {
                expireTime: Date.now() + 3600 * 1000,
                token: res.token
            };
        }
        return this.cacheToken.token;
    }
    /**
     * Basic login.
     */
    async login() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token`);
        return await request.post(url, {
            form: {
                expiration: 4000,
                password: this.cluster.password,
                username: this.cluster.username
            },
            json: true,
            timeout: OpenPAIBaseClient.TIMEOUT
        });
    }
}
exports.OpenPAIBaseClient = OpenPAIBaseClient;
OpenPAIBaseClient.TIMEOUT = 60 * 1000;
