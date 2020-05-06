"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI group client.
 */
class GroupClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get all group objects in the system.
     */
    async getAllGroup() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Create a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    async createGroup(group) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups`, this.cluster.https);
        return await this.httpClient.post(url, group);
    }
    /**
     * Update a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    async updateGroup(group) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups`, this.cluster.https);
        return await this.httpClient.put(url, group);
    }
    /**
     * Get a group in the system.
     * @param groupName The group name.
     */
    async getGroup(groupName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups/${groupName}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Delete a group in the system.
     * @param groupName The group name.
     */
    async deleteGroup(groupName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups/${groupName}`, this.cluster.https);
        return await this.httpClient.delete(url);
    }
    /**
     * Get the user array of a group in the system.
     * @param groupName The group name.
     */
    async getGroupMembers(groupName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/groups/${groupName}/userlist`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.GroupClient = GroupClient;
