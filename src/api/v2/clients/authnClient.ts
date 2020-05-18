// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IAuthnInfo, ILoginInfo, IPAICluster, IPAIResponse } from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Authn client.
 */
export class AuthnClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * User login with Azure AD.
     */
    public async oidcLogin(queryString?: string): Promise<string> {
        return await this.oidcRequest('login', queryString);
    }

    /**
     * User logout from Azure AD.
     */
    public async oidcLogout(queryString?: string): Promise<string> {
        return await this.oidcRequest('logout', queryString);
    }

    /**
     * Get an access token using username and password.
     * @param username Username, set undefined to use the username in cluster setting.
     * @param password Password, set undefined to use the password in cluster setting.
     */
    public async basicLogin(username?: string, password?: string): Promise<ILoginInfo> {
        return await this.httpClient.login(username, password);
    }

    /**
     * Revoke current login token.
     */
    public async basicLogout(): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/authn/basic/logout`,
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
