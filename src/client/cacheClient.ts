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

import { Identifiable } from "../commom/identifiable";
import { Util } from "../commom/util";

export interface ICacheRecord {
    name: string;
    time: number;
    value: object | string | number;
}

const now = () => new Date().getTime();
const days2ms = (days: number) => 1000 * 3600 * 24 * days;

export class CacheClient extends Identifiable<ICacheRecord, string> {

    protected uidOf(element: ICacheRecord): string {
        return element.name;
    }

    protected expiration: number = days2ms(7); // in unit of ms, default is 7 days
    public functions: { [index: string]: Function; } = {};
    protected objects: { [index: string]: Object; } = {};

    constructor(records?: ICacheRecord[]) {
        super(records);
    }

    public setDaysToExpire(days: number) {
        this.expiration = days2ms(days);
    }

    /**
    * register a method with Cache reading (e.g. storageClient.getStorageByName)
    * -> RecentlyUsedCacheInMemory().functions.getStorageByName(storageClient, name)
    * @param skipCache if true, will always call exec() to get new value and add a record
    */
    public async delegate(thisArgs: Object, func: Function) {
        if (func.name in this.objects) {
            throw new Error(`AlreadyBound: ${func.name}`);
        }
        this.objects[func.name] = thisArgs;
        this.functions[func.name] = async (skipCache: boolean, ...args: any[]) => {
            let name = [func.name].concat(args).join(':');
            Util.debug(`try to read (skipCache = ${skipCache}) the value of key ${name}`);
            if (!skipCache) {
                const idx = this.indexOf(name);
                if (idx > -1 && (now() - this.data[idx].time) < this.expiration) {
                    Util.debug(`found valid cache created @ ${new Date(this.data[idx].time)}`);
                    return this.data[idx].value;
                }
            }
            let value = await func.call(this.objects[func.name], ...args);
            this.add({ name: name, time: now(), value: value });
            Util.debug('no cached record found, create it', value);
            return value;
        };
    }
}