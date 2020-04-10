/**
 * Utility class.
 */
declare class UtilClass {
    https: boolean;
    debugMode: boolean;
    fixUrl(url: string, https?: boolean): string;
    expandUser(url: string): string;
    debug(msg?: string, obj?: object): void;
}
export declare const Util: UtilClass;
export {};
