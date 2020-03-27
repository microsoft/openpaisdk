"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
