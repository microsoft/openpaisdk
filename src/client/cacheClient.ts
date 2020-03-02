// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { Identifiable } from '../commom/identifiable';
import { Util } from '../commom/util';

/**
 * for some stable API calling (the results may not change for a long while)
 * the cache mechanism will help to reduce communication consumption
 */
export interface ICacheRecord {
    name: string;
    time: number;
    value: object | string | number;
}

function now(): number {
    return new Date().getTime();
}

function days2ms(days: number): number {
    return 1000 * 3600 * 24 * days;
}

/**
 * CacheClient will delegate some OpenPAIClient methods
 */
export class CacheClient extends Identifiable<ICacheRecord, string> {
    public functions: { [index: string]: Function; } = {};

    protected expiration: number = days2ms(7); // in unit of ms, default is 7 days
    protected objects: { [index: string]: Object; } = {};

    constructor(records?: ICacheRecord[]) {
        super(records);
    }

    public setDaysToExpire(days: number): void {
        this.expiration = days2ms(days);
    }

    /**
     * register a method with Cache reading (e.g. storageClient.getStorageByName)
     * -> RecentlyUsedCacheInMemory().functions.getStorageByName(skipCache, name)
     * @param skipCache if true, will always call exec() to get new value and add a record
     */
    public delegate(thisArgs: Object, func: Function): void {
        if (func.name in this.objects) {
            throw new Error(`AlreadyBound: ${func.name}`);
        }
        this.objects[func.name] = thisArgs;
        this.functions[func.name] = async (skipCache: boolean, ...args: any[]) => {
            const name: string = [func.name].concat(args).join(':');
            Util.debug(`try to read (skipCache = ${skipCache}) the value of key ${name}`);
            if (!skipCache) {
                const idx: number = this.indexOf(name);
                if (idx > -1 && (now() - this.data[idx].time) < this.expiration) {
                    Util.debug(`found valid cache created @ ${new Date(this.data[idx].time)}`);
                    return this.data[idx].value;
                }
            }
            const value: any = await func.call(this.objects[func.name], ...args);
            this.add({ name: name, time: now(), value: value });
            Util.debug('no cached record found, create it', value);
            return value;
        };
    }

    protected uidOf(element: ICacheRecord): string {
        return element.name;
    }
}