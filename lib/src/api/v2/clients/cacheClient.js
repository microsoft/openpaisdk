"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const identifiable_1 = require("../../../commom/identifiable");
const util_1 = require("../../../commom/util");
function now() {
    return new Date().getTime();
}
function days2ms(days) {
    return 1000 * 3600 * 24 * days;
}
/**
 * CacheClient will delegate some OpenPAIClient methods
 */
class CacheClient extends identifiable_1.Identifiable {
    constructor(records) {
        super(records);
        this.functions = {};
        this.expiration = days2ms(7); // in unit of ms, default is 7 days
        this.objects = {};
    }
    setDaysToExpire(days) {
        this.expiration = days2ms(days);
    }
    /**
     * register a method with Cache reading (e.g. storageClient.getStorageByName)
     * -> RecentlyUsedCacheInMemory().functions.getStorageByName(skipCache, name)
     * @param skipCache if true, will always call exec() to get new value and add a record
     */
    delegate(thisArgs, func) {
        if (func.name in this.objects) {
            throw new Error(`AlreadyBound: ${func.name}`);
        }
        this.objects[func.name] = thisArgs;
        this.functions[func.name] = async (skipCache, ...args) => {
            const name = [func.name].concat(args).join(':');
            util_1.Util.debug(`try to read (skipCache = ${skipCache}) the value of key ${name}`);
            if (!skipCache) {
                const idx = this.indexOf(name);
                if (idx > -1 && (now() - this.data[idx].time) < this.expiration) {
                    util_1.Util.debug(`found valid cache created @ ${new Date(this.data[idx].time)}`);
                    return this.data[idx].value;
                }
            }
            const value = await func.call(this.objects[func.name], ...args);
            this.add({ name: name, time: now(), value: value });
            util_1.Util.debug('no cached record found, create it', value);
            return value;
        };
    }
    uidOf(element) {
        return element.name;
    }
}
exports.CacheClient = CacheClient;
