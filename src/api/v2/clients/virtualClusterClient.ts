// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { INodeResource, IPAICluster, IVirtualCluster } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Virtual Cluster client.
 */
export class VirtualClusterClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * list all virtual clusters.
     */
    public async list(): Promise<{ [id: string]: IVirtualCluster; }> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * get a virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    public async get(vcName: string): Promise<IVirtualCluster> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * get virtual cluster node resource.
     */
    public async getNodeResource(): Promise<{ [id: string]: INodeResource; }> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/nodeResource`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Create or update a new virtual cluster.
     * @param vcName The name of the new virtual cluster.
     * @param vcCapacity The new capacity.
     * @param vcMaxCapacity The new max capacity, range of [vcCapacity, 100].
     */
    public async createOrUpdate(
        vcName: string,
        vcCapacity: number,
        vcMaxCapacity: number
    ): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { vcCapacity, vcMaxCapacity });
    }

    /**
     * Delete a virtual cluster.
     * @param vcName The virtual cluster name.
     */
    public async delete(vcName: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    /**
     * Change a virtual cluster's status.
     * @param vcName The virtual cluster name.
     * @param vcStatus The new status 'running' | 'stopped'.
     */
    public async changeStatus(vcName: string, vcStatus: 'running' | 'stopped'): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}/status`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { vcStatus });
    }
}
