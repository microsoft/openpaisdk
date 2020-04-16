// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IPAIResponse, IUser } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI User client.
 */
export class UserClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Create a user in the system.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    public async createUser(user: IUser): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/`,
            this.cluster.https
        );
        return await this.httpClient.post(url, user);
    }

    /**
     * Get all users in the system by admin.
     */
    public async getAllUser(): Promise<IUser[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Update a user in the system. Admin only.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    public async updateUser(user: IUser): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users`,
            this.cluster.https
        );
        return this.httpClient.put(url, user);
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
    ): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/me`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { username, email, newPassword, oldPassword });
    }

    /**
     * Get a user's data.
     * @param userName The user's name.
     */
    public async getUser(userName: string): Promise<IUser> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}`,
            this.cluster.https
        );
        return this.httpClient.get(url);
    }

    /**
     * Remove a user in the system.
     * Basic mode only.
     * Admin only.
     * @param userName The user's name.
     */
    public async deleteUser(userName: string): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    /**
     * Add a group to a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     */
    public async updateUserGroup(userName: string, groupname: string): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { groupname });
    }

    /**
     * Remove a group from user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     */
    public async deleteUserGroup(userName: string, groupname: string): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/group`,
            this.cluster.https
        );
        return await this.httpClient.delete(url, undefined, { data: { groupname } });
    }

    /**
     * Update a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param grouplist The new group list.
     */
    public async updateUserGrouplist(userName: string, grouplist: string[]): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/users/${userName}/grouplist`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { grouplist });
    }
}
