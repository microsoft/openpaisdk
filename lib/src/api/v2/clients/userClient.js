"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI User client.
 */
class UserClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Create a user in the system.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    async createUser(user) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/`, this.cluster.https);
        return await this.httpClient.post(url, user);
    }
    /**
     * Get all users in the system by admin.
     */
    async getAllUser() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Update a user in the system. Admin only.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    async updateUser(user) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users`, this.cluster.https);
        return this.httpClient.put(url, user);
    }
    /**
     * Update user's own profile in the system.
     * @param username The user name.
     * @param email The new email address, optional.
     * @param newPassword The new password, optional.
     * @param oldPassword The old password, optional.
     */
    async updateUserSelf(username, email, newPassword, oldPassword) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/me`, this.cluster.https);
        return await this.httpClient.put(url, { username, email, newPassword, oldPassword });
    }
    /**
     * Get a user's data.
     * @param userName The user's name.
     */
    async getUser(userName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/${userName}`, this.cluster.https);
        return this.httpClient.get(url);
    }
    /**
     * Remove a user in the system.
     * Basic mode only.
     * Admin only.
     * @param userName The user's name.
     */
    async deleteUser(userName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/${userName}`, this.cluster.https);
        return await this.httpClient.delete(url);
    }
    /**
     * Add a group to a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     */
    async updateUserGroup(userName, groupname) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`, this.cluster.https);
        return await this.httpClient.put(url, { groupname });
    }
    /**
     * Remove a group from user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     */
    async deleteUserGroup(userName, groupname) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`, this.cluster.https);
        return await this.httpClient.delete(url, undefined, { data: { groupname } });
    }
    /**
     * Update a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param grouplist The new group list.
     */
    async updateUserGrouplist(userName, grouplist) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/users/${userName}/grouplist`, this.cluster.https);
        return await this.httpClient.put(url, { grouplist });
    }
}
exports.UserClient = UserClient;
