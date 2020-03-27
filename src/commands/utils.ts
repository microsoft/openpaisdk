// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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