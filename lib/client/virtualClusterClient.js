"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const util_1 = require("../commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Virtual Cluster client.
 */
class VirtualClusterClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * list all virtual clusters.
     */
    async list() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
    /**
     * get a virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    async get(vcName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
    /**
     * get virtual cluster node resource.
     */
    async getNodeResource() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/nodeResource`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
    /**
     * Create or update a new virtual cluster.
     * @param vcName The name of the new virtual cluster.
     * @param vcCapacity The new capacity.
     * @param vcMaxCapacity The new max capacity, range of [vcCapacity, 100].
     * @param token Specific an access token (optional).
     */
    async createOrUpdate(vcName, vcCapacity, vcMaxCapacity, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.put(url, {
            body: JSON.stringify({ vcCapacity, vcMaxCapacity }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    /**
     * Delete a virtual cluster.
     * @param vcName The virtual cluster name.
     * @param token Specific an access token (optional).
     */
    async delete(vcName, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    /**
     * Change a virtual cluster's status.
     * @param vcName The virtual cluster name.
     * @param vcStatus The new status 'running' | 'stopped'.
     * @param token Specific an access token (optional).
     */
    async changeStatus(vcName, vcStatus, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}/status`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.put(url, {
            body: JSON.stringify({ vcStatus }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
}
exports.VirtualClusterClient = VirtualClusterClient;
