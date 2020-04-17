// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from 'fs-extra';
import { dirname } from 'path';
import { getBorderCharacters, table } from 'table';

import { Util } from '../commom/util';

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

export function table2Console(rows: any[][]): void {
    const config: any = {
        border: getBorderCharacters('ramac')
    };
    const output: any = table(rows, config);
    console.log(output);
}
