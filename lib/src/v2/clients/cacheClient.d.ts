import { Identifiable } from '../../commom/identifiable';
/**
 * for some stable API calling (the results may not change for a long while)
 * the cache mechanism will help to reduce communication consumption
 */
export interface ICacheRecord {
    name: string;
    time: number;
    value: object | string | number;
}
/**
 * CacheClient will delegate some OpenPAIClient methods
 */
export declare class CacheClient extends Identifiable<ICacheRecord, string> {
    functions: {
        [index: string]: Function;
    };
    protected expiration: number;
    protected objects: {
        [index: string]: Object;
    };
    constructor(records?: ICacheRecord[]);
    setDaysToExpire(days: number): void;
    /**
     * register a method with Cache reading (e.g. storageClient.getStorageByName)
     * -> RecentlyUsedCacheInMemory().functions.getStorageByName(skipCache, name)
     * @param skipCache if true, will always call exec() to get new value and add a record
     */
    delegate(thisArgs: Object, func: Function): void;
    protected uidOf(element: ICacheRecord): string;
}
