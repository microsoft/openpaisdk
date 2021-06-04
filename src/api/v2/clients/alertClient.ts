// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IPAIClusterInfo } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Api client.
 */
export class AlertClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get OpenPAI cluster info.
     */
    public async getAlerts(): Promise<IPAIClusterInfo> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/alerts`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }
}
