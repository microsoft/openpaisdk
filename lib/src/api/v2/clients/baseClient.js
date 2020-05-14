"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const paiHttpClient_1 = require("../../../commom/paiHttpClient");
const util_1 = require("../../../commom/util");
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
            }
        };
        this.cluster = OpenPAIBaseClient.parsePaiUri(cluster);
        this.httpClient = new paiHttpClient_1.PAIHttpClient(cluster);
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
     * Get OpenPAI access token.
     */
    async getToken() {
        if (!this.cluster.token) {
            const info = await this.httpClient.login();
            this.cluster.token = info.token;
        }
        return this.cluster.token;
    }
}
exports.OpenPAIBaseClient = OpenPAIBaseClient;
OpenPAIBaseClient.TIMEOUT = 60 * 1000;
