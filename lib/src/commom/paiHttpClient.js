"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const axios_1 = require("axios");
const paiError_1 = require("./errors/paiError");
const paiResponseProcessor_1 = require("./paiResponseProcessor");
/**
 * Http client for PAI rest-server.
 */
class PAIHttpClient {
    constructor(cluster) {
        this.cluster = cluster;
    }
    async login() {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/authn/basic/login`);
        try {
            const res = await axios_1.default.post(url, {
                expiration: 4000,
                password: this.cluster.password,
                username: this.cluster.username
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            return res.data;
        }
        catch (error) {
            throw error;
        }
    }
    async get(url, processor, options = {}, query) {
        try {
            if (query) {
                const qstrings = [];
                Object.entries(query).forEach(([k, v]) => {
                    if (v !== undefined) {
                        qstrings.push(`${k}=${v}`);
                    }
                });
                if (qstrings.length > 0) {
                    url = `${url}?${qstrings.join('&')}`;
                }
            }
            const defaultOptions = await this.defaultOptions();
            if (processor) {
                const res = await axios_1.default.get(url, { ...{ responseType: 'text' }, ...defaultOptions, ...options });
                return paiResponseProcessor_1.processResponse(res, processor);
            }
            else {
                const res = await axios_1.default.get(url, { ...defaultOptions, ...options });
                return res.data;
            }
        }
        catch (error) {
            paiError_1.paiError(error);
            throw error;
        }
    }
    async post(url, data, processor, options = {}) {
        try {
            const defaultOptions = await this.defaultOptions();
            if (processor) {
                const res = await axios_1.default.post(url, data, { ...{ responseType: 'text' }, ...defaultOptions, ...options });
                return paiResponseProcessor_1.processResponse(res, processor);
            }
            else {
                const res = await axios_1.default.post(url, data, { ...defaultOptions, ...options });
                return res.data;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async put(url, data, processor, options = {}) {
        try {
            const defaultOptions = await this.defaultOptions();
            if (processor) {
                const res = await axios_1.default.put(url, data, { ...{ responseType: 'text' }, ...defaultOptions, ...options });
                return paiResponseProcessor_1.processResponse(res, processor);
            }
            else {
                const res = await axios_1.default.put(url, data, { ...defaultOptions, ...options });
                return res.data;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async delete(url, processor, options = {}) {
        try {
            const defaultOptions = await this.defaultOptions();
            if (processor) {
                const res = await axios_1.default.delete(url, { ...{ responseType: 'text' }, ...defaultOptions, ...options });
                return paiResponseProcessor_1.processResponse(res, processor);
            }
            else {
                const res = await axios_1.default.delete(url, { ...defaultOptions, ...options });
                return res.data;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async defaultOptions() {
        if (!this.cluster.token) {
            const info = await this.login();
            this.cluster.token = info.token;
        }
        return {
            headers: {
                Authorization: `Bearer ${this.cluster.token}`,
                'content-type': 'application/json'
            },
            timeout: PAIHttpClient.TIMEOUT
        };
    }
}
exports.PAIHttpClient = PAIHttpClient;
PAIHttpClient.TIMEOUT = 60 * 1000;
