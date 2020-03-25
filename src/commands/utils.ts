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

import * as fs from 'fs-extra';
import { dirname } from 'path';

import { Util } from '../commom/util';
import { table, getBorderCharacters } from 'table';

/**
 * utils functions
 */
export async function readJson<T extends object>(pth: string, val?: T): Promise<T> {
    try {
        const data: T = await fs.readJson(pth);
        Util.debug(`data loaded from ${pth}`, data);
        return data;
    } catch (e) {
        console.warn((e as Error).message);
        if (val == null) {
            throw new Error(e);
        }
        return val;
    }
}

export async function writeJson<T extends object>(pth: string, val: T): Promise<void> {
    await fs.ensureDir(dirname(pth));
    await fs.writeJSON(pth, val);
    Util.debug(`saved to ${pth}`);
}

export function table2Console(rows: any[][]) {
    const config = {
        border: getBorderCharacters(`ramac`)
    };
    const output = table(rows, config);
    console.log(output);
}