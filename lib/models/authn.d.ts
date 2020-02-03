/**
 * OpenPAI authn information.
 */
export interface IAuthnInfo {
    authn_type: string;
    loginURI: string;
    loginURIMethod: 'get' | 'post';
}
/**
 * OpenPAI authn basic login information.
 */
export interface ILoginInfo {
    admin: boolean;
    hasGitHubPAT: boolean;
    token: string;
    user: string;
}
