// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IUserInfo } from '@api/v2';
import { Util } from '@pai/commom/util';
import * as request from 'request-promise-native';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI User client.
 */
export class UserClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get user information.
     * @param userName The user name.
     */
    public async get(userName: string): Promise<IUserInfo> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}`,
            this.cluster.https
        );
        return this.httpClient.get(url);
    }

    /**
     * Get all users.
     */
    public async list(): Promise<IUserInfo[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Create a new user.
     * @param username username in [\w.-]+ format.
     * @param password password at least 6 characters.
     * @param admin true | false.
     * @param email email address or empty string.
     * @param virtualCluster ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"].
     * @param extension { "extension-key1": "extension-value1" }.
     */
    public async create(
        username: string,
        password: string,
        admin: boolean,
        email: string,
        virtualCluster: string[],
        extension?: {}
    ): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/`,
            this.cluster.https
        );
        const body: any = { username, email, password, admin, virtualCluster, extension };
        return await this.httpClient.post(url, body);
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
     */
    public async updateExtension(userName: string, extension: {}): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/extension`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { extension });
    }

    /**
     * Delete a user.
     * @param userName The user name.
     */
    public async delete(userName: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    /**
     * Update user's virtual cluster.
     * @param userName The user name.
     * @param virtualCluster The new virtualCluster.
     * {
     *    "virtualCluster": ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"]
     * }
     */
    public async updateVirtualcluster(userName: string, virtualCluster: string[]): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/virtualcluster`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { virtualCluster });
    }

    /**
     * Update user's password.
     * @param userName The user name.
     * @param oldPassword password at least 6 characters, admin could ignore this params.
     * @param newPassword password at least 6 characters.
     */
    public async updatePassword(userName: string, oldPassword?: string, newPassword?: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/password`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { oldPassword, newPassword });
    }

    /**
     * Update user's email.
     * @param userName The user name.
     * @param email The new email.
     */
    public async updateEmail(userName: string, email: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/email`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { email });
    }

    /**
     * Update user's admin permission.
     * @param userName The user name.
     * @param admin true | false.
     */
    public async updateAdminPermission(userName: string, admin: boolean): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/admin`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { admin });
    }

    /**
     * Update user's group list.
     * @param userName The user name.
     * @param grouplist The new group list.
     */
    public async updateGroupList(userName: string, grouplist: string[]): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/grouplist`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { grouplist });
    }

    /**
     * Add group into user's group list.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     */
    public async addGroup(userName: string, groupname: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { groupname });
    }

    /**
     * Remove group from user's group list.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     */
    public async removeGroup(userName: string, groupname: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`,
            this.cluster.https
        );
        return await this.httpClient.delete(url, undefined, { data: { groupname } });
    }

    /**
     * Update user's own profile in the system.
     * @param username The user name.
     * @param email The new email address, optional.
     * @param newPassword The new password, optional.
     * @param oldPassword The old password, optional.
     */
    public async updateUserSelf(
        username: string, email?: string, newPassword?: string, oldPassword?: string
    ): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/me`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { username, email, newPassword, oldPassword });
    }
}
