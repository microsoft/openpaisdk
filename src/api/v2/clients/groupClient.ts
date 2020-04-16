// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IGroup, IPAICluster, IUserInfo } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI group client.
 */
export class GroupClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get all group objects in the system.
     */
    public async getAllGroup(): Promise<IGroup[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Create a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    public async createGroup(group: IGroup): Promise<string> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups`,
            this.cluster.https
        );
        return await this.httpClient.post(url, group);
    }

    /**
     * Update a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    public async updateGroup(group: IGroup): Promise<string> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups`,
            this.cluster.https
        );
        return await this.httpClient.put(url, group);
    }

    /**
     * Get a group in the system.
     * @param groupName The group name.
     */
    public async getGroup(groupName: string): Promise<IGroup> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups/${groupName}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Delete a group in the system.
     * @param groupName The group name.
     */
    public async deleteGroup(groupName: string): Promise<string> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups/${groupName}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    /**
     * Get the user array of a group in the system.
     * @param groupName The group name.
     */
    public async getGroupMembers(groupName: string): Promise<IUserInfo[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/groups/${groupName}/userlist`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }
}
