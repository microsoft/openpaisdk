"use strict";
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const util_1 = require("../commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI User client.
 */
class UserClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get user information.
     * @param userName The user name.
     * @param token Specific an access token (optional).
     */
    async get(userName, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return JSON.parse(res);
    }
    /**
     * Get all users.
     * @param token Specific an access token (optional).
     */
    async list(token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return JSON.parse(res);
    }
    /**
     * Create a new user.
     * @param username username in [\w.-]+ format.
     * @param password password at least 6 characters.
     * @param admin true | false.
     * @param email email address or empty string.
     * @param virtualCluster ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"].
     * @param extension { "extension-key1": "extension-value1" }.
     * @param token Specific an access token (optional).
     */
    async create(username, password, admin, email, virtualCluster, extension, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.post(url, {
            body: JSON.stringify({ username, email, password, admin, virtualCluster, extension }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    /**
     * Update user extension data.
     * @param userName The user name.
     * @param extension The new extension.
     * {
     *   "extension": {
     *      "key-you-wannat-add-or-update-1": "value1",
     *      "key-you-wannat-add-or-update-2": {...},
     *      "key-you-wannat-add-or-update-3": [...]
     * }
     * @param token Specific an access token (optional).
     */
    async updateExtension(userName, extension, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/extension`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { extension }, token);
        return JSON.parse(res);
    }
    /**
     * Delete a user.
     * @param userName The user name.
     * @param token Specific an access token (optional).
     */
    async delete(userName, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}`);
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
     * Update user's virtual cluster.
     * @param userName The user name.
     * @param virtualCluster The new virtualCluster.
     * {
     *    "virtualCluster": ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"]
     * }
     * @param token Specific an access token (optional).
     */
    async updateVirtualcluster(userName, virtualCluster, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/virtualcluster`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { virtualCluster }, token);
        return JSON.parse(res);
    }
    /**
     * Update user's password.
     * @param userName The user name.
     * @param oldPassword password at least 6 characters, admin could ignore this params.
     * @param newPassword password at least 6 characters.
     * @param token Specific an access token (optional).
     */
    async updatePassword(userName, oldPassword, newPassword, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/password`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { oldPassword, newPassword }, token);
        return JSON.parse(res);
    }
    /**
     * Update user's email.
     * @param userName The user name.
     * @param email The new email.
     * @param token Specific an access token (optional).
     */
    async updateEmail(userName, email, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/email`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { email }, token);
        return JSON.parse(res);
    }
    /**
     * Update user's admin permission.
     * @param userName The user name.
     * @param admin true | false.
     * @param token Specific an access token (optional).
     */
    async updateAdminPermission(userName, admin, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/admin`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { admin }, token);
        return JSON.parse(res);
    }
    /**
     * Update user's group list.
     * @param userName The user name.
     * @param grouplist The new group list.
     * @param token Specific an access token (optional).
     */
    async updateGroupList(userName, grouplist, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/grouplist`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { grouplist }, token);
        return JSON.parse(res);
    }
    /**
     * Add group into user's group list.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     * @param token Specific an access token (optional).
     */
    async addGroup(userName, groupname, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/group`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await this.sendPutRequestWithToken(url, { groupname }, token);
        return JSON.parse(res);
    }
    /**
     * Remove group from user's group list.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     * @param token Specific an access token (optional).
     */
    async removeGroup(userName, groupname, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/group`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.delete(url, {
            body: JSON.stringify({ groupname }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
    async sendPutRequestWithToken(url, body, token) {
        return await request.put(url, {
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }
}
exports.UserClient = UserClient;
