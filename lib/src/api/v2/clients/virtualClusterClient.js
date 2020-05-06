"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Virtual Cluster client.
 */
class VirtualClusterClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get the list of virtual clusters.
     */
    async listVirtualClusters() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get virtual cluster status in the system.
     * @param vcName The name of virtual cluster.
     */
    async getVirtualCluster(vcName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get sku types in the virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    async getVirtualClusterSkuTypes(vcName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}/sku-types`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.VirtualClusterClient = VirtualClusterClient;
