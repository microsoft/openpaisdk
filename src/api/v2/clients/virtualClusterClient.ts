// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { INodeResource, IPAICluster, IVirtualCluster } from '@api/v2';
import { Util } from '@pai/commom/util';
import * as request from 'request-promise-native';

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
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters`);
        const res: any = await request.get(url);
        return JSON.parse(res);
    }

    /**
     * get a virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    public async get(vcName: string): Promise<IVirtualCluster> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`);
        const res: any = await request.get(url);
        return JSON.parse(res);
    }

    /**
     * get virtual cluster node resource.
     */
    public async getNodeResource(): Promise<{ [id: string]: INodeResource; }> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/virtual-clusters/nodeResource`);
        const res: any = await request.get(url);
        return JSON.parse(res);
    }

    /**
     * Create or update a new virtual cluster.
     * @param vcName The name of the new virtual cluster.
     * @param vcCapacity The new capacity.
     * @param vcMaxCapacity The new max capacity, range of [vcCapacity, 100].
     * @param token Specific an access token (optional).
     */
    public async createOrUpdate(
        vcName: string,
        vcCapacity: number,
        vcMaxCapacity: number,
        token?: string
    ): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res: any = await request.put(url, {
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
    public async delete(vcName: string, token?: string): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res: any = await request.delete(url, {
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
    public async changeStatus(vcName: string, vcStatus: 'running' | 'stopped', token?: string): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/virtual-clusters/${vcName}/status`);
        if (token === undefined) {
            token = await super.token();
        }
        const res: any = await request.put(url, {
            body: JSON.stringify({ vcStatus }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
}
