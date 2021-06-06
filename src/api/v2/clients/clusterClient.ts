// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Util } from '@pai/commom/util';

import { ISkuType } from '../models/virtualCluster';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Cluster client.
 */
export class ClusterClient extends OpenPAIBaseClient {

    /**
     * Get sku types.
     * @param vcName The name of virtual cluster.
     */
    public async getSkuTypes(vcName?: string): Promise<{ [id: string]: ISkuType; }> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/cluster/sku-types`,
            this.cluster.https
        );
        return await this.httpClient.get(url, undefined, undefined, { vc: vcName });
    }
}
