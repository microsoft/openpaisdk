// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Util } from '@pai/commom/util';
import { ILoginInfo, IPAICluster, IPAIClusterInfo, ITokenItem } from '@pai/v2';
import * as request from 'request-promise-native';
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
        },

        /**
         * Get OpenPAI cluster info, will call /api/v1.
         */
        clusterInfo: async (): Promise<IPAIClusterInfo> => {
            const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/`);
            const res: any = await request.get(url);
            return JSON.parse(res);
        }
    };
    protected cluster: IPAICluster;

    private cacheToken?: ITokenItem;

    constructor(cluster: IPAICluster) {
        this.cluster = OpenPAIBaseClient.parsePaiUri(cluster);
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
     * Get OpenPAI access token, will call /api/v1/token.
     */
    public async token(): Promise<string> {
        if (this.cluster.token) {
            return this.cluster.token;
        } else if (!this.cacheToken || this.cacheToken.expireTime < Date.now()) {
            const res: ILoginInfo = await this.login();
            this.cacheToken = {
                expireTime: Date.now() + 3600 * 1000,
                token: res.token
            };
        }
        return this.cacheToken!.token;
    }

    /**
     * Basic login.
     */
    public async login(): Promise<ILoginInfo> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token`);
        return await request.post(url, {
            form: {
                expiration: 4000,
                password: this.cluster.password,
                username: this.cluster.username
            },
            json: true,
            timeout: OpenPAIBaseClient.TIMEOUT
        });
    }
}
