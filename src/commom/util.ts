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
