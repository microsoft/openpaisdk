// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IAuthnInfo, IPAICluster } from '@api/v2';
import { Util } from '@pai/commom/util';
import * as request from 'request-promise-native';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Authn client.
 */
export class AuthnClient extends OpenPAIBaseClient {
    private authnInfo?: IAuthnInfo;

    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get authn information.
     */
    public async info(): Promise<IAuthnInfo> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/info`);
        if (this.authnInfo === undefined) {
            this.authnInfo = JSON.parse(await request.get(url));
        }

        return this.authnInfo!;
    }

    /**
     * OpenID Connect login.
     */
    public async oidcLogin(queryString?: string): Promise<any> {
        const url: string = queryString ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/login?${queryString}`) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/login`);
        // tslint:disable-next-line:no-unnecessary-local-variable
        const res: string = await request.get(url);

        return res;
    }

    /**
     * OpenID Connect logout.
     */
    public async oidcLogout(queryString?: string): Promise<any> {
        const url: string = queryString ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/logout?${queryString}`) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/oidc/logout`);
        // tslint:disable-next-line:no-unnecessary-local-variable
        const res: string = await request.get(url);

        return res;
    }

    /**
     * Get list of available tokens (portal token + application token).
     */
    public async getTokens(token?: string): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token`);
        if (token === undefined) {
            token = await super.token();
        }
        const res: string = await request.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }

    /**
     * Create an application access token.
     */
    public async createApplicationToken(token?: string): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token/application`);
        if (token === undefined) {
            token = await super.token();
        }
        const res: string = await request.post(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }

    /**
     * Revoke a token.
     */
    public async deleteToken(deleteToken: string, accessToken?: string): Promise<any> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/token/${deleteToken}`);
        if (accessToken === undefined) {
            accessToken = await super.token();
        }
        const res: string = await request.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return JSON.parse(res);
    }
}
