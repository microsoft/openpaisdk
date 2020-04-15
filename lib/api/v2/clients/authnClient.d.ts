import { IAuthnInfo, ILoginInfo, IPAICluster } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Authn client.
 */
export declare class AuthnClient extends OpenPAIBaseClient {
    private authnInfo?;
    constructor(cluster: IPAICluster);
    login(): Promise<ILoginInfo>;
    /**
     * Get authn information.
     */
    info(): Promise<IAuthnInfo>;
    /**
     * OpenID Connect login.
     */
    oidcLogin(queryString?: string): Promise<string>;
    /**
     * OpenID Connect logout.
     */
    oidcLogout(queryString?: string): Promise<string>;
    /**
     * Get list of available tokens (portal token + application token).
     */
    getTokens(): Promise<string[]>;
    /**
     * Create an application access token.
     */
    createApplicationToken(): Promise<any>;
    /**
     * Revoke a token.
     */
    deleteToken(deleteToken: string, accessToken?: string): Promise<any>;
    private oidcRequest;
}
