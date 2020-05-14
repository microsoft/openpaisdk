import { ILoginInfo, IPAICluster, IPAIResponse } from "..";
import { OpenPAIBaseClient } from "./baseClient";
/**
 * OpenPAI Authn client.
 */
export declare class AuthnClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * User login with Azure AD.
     */
    oidcLogin(queryString?: string): Promise<string>;
    /**
     * User logout from Azure AD.
     */
    oidcLogout(queryString?: string): Promise<string>;
    /**
     * Get an access token using username and password.
     * @param username Username, set undefined to use the username in cluster setting.
     * @param password Password, set undefined to use the password in cluster setting.
     */
    basicLogin(username?: string, password?: string): Promise<ILoginInfo>;
    /**
     * Revoke current login token.
     */
    basicLogout(): Promise<IPAIResponse>;
    private oidcRequest;
}
