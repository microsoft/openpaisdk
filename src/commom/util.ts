// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Utility class.
 */
class UtilClass {
    public https: boolean = false;
    public debugMode: boolean = false;

    public fixUrl(url: string, https?: boolean): string {
        if (!/^[a-zA-Z]+?\:\/\//.test(url)) {
            url = `http${https ? 's' : ''}://` + url;
        }
        return url;
    }

    public expandUser(url: string): string {
        if (/~/.test(url)) {
            const home: string | undefined = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
            if (home) {
                url = url.replace('~', home);
            } else {
                throw new Error(`could not resolve ~ for ${url}`);
            }
        }
        return url;
    }

    public debug(msg?: string, obj?: object): void {
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

export const Util: UtilClass = new UtilClass();
