"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Api client.
 */
class ApiClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get OpenPAI cluster info.
     */
    async getClusterInfo() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/info`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.ApiClient = ApiClient;
