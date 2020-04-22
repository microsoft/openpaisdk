import { IPAICluster, IPAIResponse, IToken, ITokenList } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Api client.
 */
export declare class TokenClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get your currently signed tokens.
     */
    getTokens(): Promise<ITokenList>;
    /**
     * Revoke a token.
     * @param deleteToken The token string.
     */
    deleteToken(deleteToken: string): Promise<IPAIResponse>;
    /**
     * Create an application access token in the system.
     */
    createApplicationToken(): Promise<IToken>;
}
