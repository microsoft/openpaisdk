import { Identifiable } from "../commom/identifiable";
export interface ICacheRecord {
    name: string;
    time: number;
    value: object | string | number;
}
export declare class CacheClient extends Identifiable<ICacheRecord, string> {
    protected uidOf(element: ICacheRecord): string;
    protected expiration: number;
    functions: {
        [index: string]: Function;
    };
    protected objects: {
        [index: string]: Object;
    };
    constructor(records?: ICacheRecord[]);
    setDaysToExpire(days: number): void;
    /**
    * register a method with Cache reading (e.g. storageClient.getStorageByName)
    * -> RecentlyUsedCacheInMemory().functions.getStorageByName(storageClient, name)
    * @param skipCache if true, will always call exec() to get new value and add a record
    */
    delegate(thisArgs: Object, func: Function): Promise<void>;
}
