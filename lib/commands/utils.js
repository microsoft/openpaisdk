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
const fs = require("fs-extra");
const path_1 = require("path");
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
