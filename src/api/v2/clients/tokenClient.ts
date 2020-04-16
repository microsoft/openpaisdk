// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IPAIResponse, IToken, ITokenList } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Api client.
 */
export class TokenClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get your currently signed tokens.
     */
    public async getTokens(): Promise<ITokenList> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Revoke a token.
     * @param deleteToken The token string.
     */
    public async deleteToken(deleteToken: string): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens/${deleteToken}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    /**
     * Create an application access token in the system.
     */
    public async createApplicationToken(): Promise<IToken> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens/application`,
            this.cluster.https
        );
        return await this.httpClient.post(url, {});
    }
}
