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
const util_1 = require("../commom/util");
const baseClient_1 = require("./baseClient");
const axios_1 = require("axios");
/**
 * OpenPAI Job client.
 */
class StorageClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Get storage informations.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    async getServer(names, token) {
        const query = names ? `?names=${names}` : '';
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage information.
     * @param storage The storage name.
     */
    async getServerByName(storage, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage config.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    async getConfig(names, token) {
        const query = names ? `?names=${names}` : '';
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
    /**
     * Get storage config.
     * @param storage The storage name.
     */
    async getConfigByName(storage, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
}
exports.StorageClient = StorageClient;
