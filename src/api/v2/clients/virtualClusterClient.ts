// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IVirtualCluster } from '@api/v2';
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
     * Get the list of virtual clusters.
     */
    public async listVirtualClusters(): Promise<{ [id: string]: IVirtualCluster; }> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get virtual cluster status in the system.
     * @param vcName The name of virtual cluster.
     */
    public async getVirtualCluster(vcName: string): Promise<IVirtualCluster> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/virtual-clusters/${vcName}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }
}
