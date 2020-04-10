"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Web HDFS Client.
 */
class WebHdfsClient {
    constructor(config, server) {
        this.mkdirAllowRecursive = true;
        throw new Error('Method not implemented.');
    }
    async getinfo(path) {
        throw new Error('Method not implemented.');
    }
    async listdir(path) {
        throw new Error('Method not implemented.');
    }
    async makedir(path, mode) {
        throw new Error('Method not implemented.');
    }
    async upload(localPath, remotePath, opts) {
        throw new Error('Method not implemented.');
    }
    async download(remotePath, localPath, opts) {
        throw new Error('Method not implemented.');
    }
    async delete(path) {
        throw new Error('Method not implemented.');
    }
}
exports.WebHdfsClient = WebHdfsClient;
