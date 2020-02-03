import { IAuthnInfo } from '../models/authn';
import { IPAICluster } from '../models/cluster';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Authn client.
 */
export declare class AuthnClient extends OpenPAIBaseClient {
    private authnInfo?;
    constructor(cluster: IPAICluster);
    /**
     * Get authn information.
     */
    info(): Promise<IAuthnInfo>;
    /**
     * OpenID Connect login.
     */
    oidcLogin(queryString?: string): Promise<any>;
    /**
     * OpenID Connect logout.
     */
    oidcLogout(queryString?: string): Promise<any>;
    /**
     * Get list of available tokens (portal token + application token).
     */
    getTokens(token?: string): Promise<any>;
    /**
     * Create an application access token.
     */
    createApplicationToken(token?: string): Promise<any>;
    /**
     * Revoke a token.
     */
    deleteToken(deleteToken: string, accessToken?: string): Promise<any>;
}
