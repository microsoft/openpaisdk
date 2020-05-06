"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Kubernetes client.
 */
class KubernetesClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get kubernetes node list. Need administrator permission.
     */
    async getK8sNodes() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/kubernetes/nodes`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get kubernetes pod list.
     */
    async getK8sPods() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/kubernetes/pods`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.KubernetesClient = KubernetesClient;
