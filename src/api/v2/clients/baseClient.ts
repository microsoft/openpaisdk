// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ILoginInfo, IPAICluster, IPAIClusterInfo } from '@api/v2';
import { PAIHttpClient } from '@pai/commom/paiHttpClient';
import { Util } from '@pai/commom/util';
import { URL } from 'url';

/**
 * OpenPAI basic client.
 */
export class OpenPAIBaseClient {
    protected static readonly TIMEOUT: number = 60 * 1000;

    /**
     * get cluster configuration / info
     */
    public config: any = {
        /**
         * username from cluster config
         */
        username: () => {
            return this.cluster.username;
        }
    };

    protected readonly httpClient: PAIHttpClient;
    protected cluster: IPAICluster;

    constructor(cluster: IPAICluster) {
        this.cluster = OpenPAIBaseClient.parsePaiUri(cluster);
        this.httpClient = new PAIHttpClient(cluster);
    }

    /**
     * parse information from pai_uri
     * refer to tests/unit_tests/baseClient.spec.ts
     */
    public static parsePaiUri(cluster: IPAICluster): IPAICluster {
        if (cluster.pai_uri) {
            const paiUri: URL = new URL(Util.fixUrl(cluster.pai_uri!));
            if (!cluster.https) {
                cluster.https = paiUri.protocol === 'https:';
            }
            if (!cluster.rest_server_uri) {
                cluster.rest_server_uri = paiUri.host + '/rest-server';
            }
            if (!cluster.alias) {
                cluster.alias = paiUri.hostname;
            }
        }
        return cluster;
    }

    /**
     * Get OpenPAI access token.
     */
    public async token(): Promise<string> {
        if (!this.cluster.token) {
            const info: ILoginInfo = await this.httpClient.login();
            this.cluster.token = info.token;
        }

        return this.cluster.token;
    }
}
