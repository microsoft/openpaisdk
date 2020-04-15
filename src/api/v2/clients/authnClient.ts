// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IAuthnInfo, ILoginInfo, IPAICluster } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Authn client.
 */
export class AuthnClient extends OpenPAIBaseClient {
    private authnInfo?: IAuthnInfo;

    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    public async login(): Promise<ILoginInfo> {
        return await this.httpClient.login();
    }

    /**
     * Get authn information.
     */
    public async info(): Promise<IAuthnInfo> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/authn/info`,
            this.cluster.https
        );
        if (this.authnInfo === undefined) {
            this.authnInfo = await this.httpClient.get(url);
        }

        return this.authnInfo!;
    }

    /**
     * OpenID Connect login.
     */
    public async oidcLogin(queryString?: string): Promise<string> {
        return await this.oidcRequest('login', queryString);
    }

    /**
     * OpenID Connect logout.
     */
    public async oidcLogout(queryString?: string): Promise<string> {
        return await this.oidcRequest('logout', queryString);
    }

    /**
     * Get list of available tokens (portal token + application token).
     */
    public async getTokens(): Promise<string[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Create an application access token.
     */
    public async createApplicationToken(): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens/application`,
            this.cluster.https
        );
        return await this.httpClient.post(url, {});
    }

    /**
     * Revoke a token.
     */
    public async deleteToken(deleteToken: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/tokens/${deleteToken}`,
            this.cluster.https
        );
        return await this.httpClient.delete(url);
    }

    private async oidcRequest(req: 'login' | 'logout', queryString?: string): Promise<string> {
        const url: string = queryString ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/${req}?${queryString}`, this.cluster.https) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/${req}`, this.cluster.https);
        return await this.httpClient.get(url, {
            200: (data) => data
        });
    }
}
