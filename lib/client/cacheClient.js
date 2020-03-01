"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const identifiable_1 = require("../commom/identifiable");
const util_1 = require("../commom/util");
const now = () => new Date().getTime();
const days2ms = (days) => 1000 * 3600 * 24 * days;
class CacheClient extends identifiable_1.Identifiable {
    constructor(records) {
        super(records);
        this.expiration = days2ms(7); // in unit of ms, default is 7 days
        this.functions = {};
        this.objects = {};
    }
    uidOf(element) {
        return element.name;
    }
    setDaysToExpire(days) {
        this.expiration = days2ms(days);
    }
    /**
    * register a method with Cache reading (e.g. storageClient.getStorageByName)
    * -> RecentlyUsedCacheInMemory().functions.getStorageByName(storageClient, name)
    * @param skipCache if true, will always call exec() to get new value and add a record
    */
    async delegate(thisArgs, func) {
        if (func.name in this.objects) {
            throw new Error(`AlreadyBound: ${func.name}`);
        }
        this.objects[func.name] = thisArgs;
        this.functions[func.name] = async (skipCache, ...args) => {
            let name = [func.name].concat(args).join(':');
            util_1.Util.debug(`try to read (skipCache = ${skipCache}) the value of key ${name}`);
            if (!skipCache) {
                const idx = this.indexOf(name);
                if (idx > -1 && (now() - this.data[idx].time) < this.expiration) {
                    util_1.Util.debug(`found valid cache created @ ${new Date(this.data[idx].time)}`);
                    return this.data[idx].value;
                }
            }
            let value = await func.call(this.objects[func.name], ...args);
            this.add({ name: name, time: now(), value: value });
            util_1.Util.debug('no cached record found, create it', value);
            return value;
        };
    }
}
exports.CacheClient = CacheClient;
