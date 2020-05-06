"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const storageNode_1 = require("@pai/storage/clients/storageNode");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Job client.
 */
class StorageClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get storage list for which current user has permissions.
     */
    async getStorages() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get storage for the given name.
     * @param name The name of storage.
     */
    async getStorage(name) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages/${name}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.StorageClient = StorageClient;
/**
 * StorageNode accepting v2 storage detail
 */
class StorageNodeV2 extends storageNode_1.StorageNode {
    storageConfigDispatcher(config) {
        if (config.type === 'azureBlob') {
            return {
                type: config.type,
                data: config.data
            };
        }
        throw Error('NotImplemented');
    }
}
exports.StorageNodeV2 = StorageNodeV2;
