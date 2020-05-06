/**
 * OpenPAI access token.
 */
export interface IToken {
    token: string;
    expireTime?: number;
    application?: boolean;
}
/**
 * OpenPAI token list.
 */
export interface ITokenList {
    tokens?: string[];
}
