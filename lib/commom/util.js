"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility class.
 */
class UtilClass {
    constructor() {
        this.https = false;
        this.debugMode = false;
    }
    fixUrl(url, https) {
        if (!/^[a-zA-Z]+?\:\/\//.test(url)) {
            url = `http${https ? 's' : ''}://` + url;
        }
        return url;
    }
    expandUser(url) {
        if (/~/.test(url)) {
            const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
            if (home) {
                url = url.replace('~', home);
            }
            else {
                throw new Error(`could not resolve ~ for ${url}`);
            }
        }
        return url;
    }
    debug(msg, obj) {
        if (!this.debugMode) {
            return;
        }
        if (msg) {
            console.debug(msg);
        }
        if (obj) {
            console.debug(obj);
        }
    }
}
exports.Util = new UtilClass();
