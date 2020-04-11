"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const storageNode_1 = require("@pai/storage/clients/storageNode");
const axios_1 = require("axios");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Job client.
 */
class StorageClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get storage informations.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    async getServer(names, token) {
        const query = names ? `?names=${names}` : '';
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage information.
     * @param storage The storage name.
     */
    async getServerByName(storage, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage config.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    async getConfig(names, token) {
        const query = names ? `?names=${names}` : '';
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage config.
     * @param storage The storage name.
     */
    async getConfigByName(storage, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    async getStorages(token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    async getStorageByName(name, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages/${name}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
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
