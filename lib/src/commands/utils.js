"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path_1 = require("path");
const table_1 = require("table");
const util_1 = require("../commom/util");
/**
 * utils functions
 */
async function readJson(pth, val) {
    try {
        const data = await fs.readJson(pth);
        util_1.Util.debug(`data loaded from ${pth}`, data);
        return data;
    }
    catch (e) {
        console.warn(e.message);
        if (val == null) {
            throw new Error(e);
        }
        return val;
    }
}
exports.readJson = readJson;
async function writeJson(pth, val) {
    await fs.ensureDir(path_1.dirname(pth));
    await fs.writeJSON(pth, val);
    util_1.Util.debug(`saved to ${pth}`);
}
exports.writeJson = writeJson;
function table2Console(rows) {
    const config = {
        border: table_1.getBorderCharacters('ramac')
    };
    const output = table_1.table(rows, config);
    console.log(output);
}
exports.table2Console = table2Console;
