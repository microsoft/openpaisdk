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
const __1 = require("..");
/**
 * StorageNode class.
 */
class StorageNode {
    constructor(config) {
        this.config = config;
        this.client = this.createClient();
    }
    /**
     * create client according to type.
     */
    createClient() {
        switch (this.config.type) {
            case 'azureBlob': return new __1.AzureBlobClient(this.config);
            default: throw new Error(`NotImplemented`);
        }
    }
    async getinfo(path) {
        return this.client.getinfo(path);
    }
    async listdir(path) {
        return this.client.listdir(path);
    }
    async makedir(path, mode) {
        try {
            return this.client.makedir(path);
        }
        catch (e) {
            if (!this.client.mkdirAllowRecursive) {
                // do something recursively
            }
        }
    }
    async upload(localPath, remotePath, opts) {
        return this.client.upload(localPath, remotePath, opts);
    }
    async download(remotePath, localPath, opts) {
        return this.client.download(remotePath, localPath, opts);
    }
    async delete(path) {
        return this.client.delete(path);
    }
    existsSync(path) {
        throw new Error('Method not implemented.');
    }
    isdirSync(path) {
        throw new Error('Method not implemented.');
    }
    /* handle folder opation
     * if this.client has corresponding folder operation, use it
     * otherwise implement it recursively
     */
    async uploadFolder(localPath, remotePath, opts) {
        if (this.client.uploadFolder) {
            return this.client.uploadFolder(localPath, remotePath, opts);
        }
        else {
            // TODO: handle upload recursively here
            throw new Error('Method not implemented.');
        }
    }
    async downloadFolder(remotePath, localPath, opts) {
        if (this.client.downloadFolder) {
            return this.client.downloadFolder(remotePath, localPath, opts);
        }
        else {
            // TODO: handle download recursively here
            throw new Error('Method not implemented.');
        }
    }
    async deleteFolder(path) {
        if (this.client.deleteFolder) {
            return this.client.deleteFolder(path);
        }
        else {
            // TODO: handle deletion recursively here
            throw new Error('Method not implemented.');
        }
    }
}
exports.StorageNode = StorageNode;
