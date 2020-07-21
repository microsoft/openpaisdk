// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    IJobAttempt, IPAICluster, IPAIResponse
} from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Kubernetes client.
 */
export class KubernetesClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get kubernetes node list. Need administrator permission.
     */
    public async getK8sNodes(namespace?: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/kubernetes/nodes`,
            this.cluster.https
        );
        return await this.httpClient.get(url, undefined, undefined, namespace ? { namespace } : undefined);
    }

    /**
     * Get kubernetes pod list.
     */
    public async getK8sPods(): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/kubernetes/pods`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }
}
