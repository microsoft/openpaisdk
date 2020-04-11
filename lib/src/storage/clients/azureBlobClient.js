"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const storage_blob_1 = require("@azure/storage-blob");
const Path = require("path");
/**
 * Azure Blob Storage Client.
 */
class AzureBlobClient {
    constructor(data) {
        this.mkdirAllowRecursive = true;
        if (!data.containerName ||
            !(data.accountKey || data.accountSASToken)) {
            throw new Error(`WrongStorageDetail: ${JSON.stringify(data)}`);
        }
        if (data.accountKey) { // use the accountKey
            const credential = new storage_blob_1.StorageSharedKeyCredential(data.accountName, data.accountKey);
            const blobClient = new storage_blob_1.BlobServiceClient(`https://${data.accountName}.blob.core.windows.net`, credential);
            this.client = blobClient.getContainerClient(data.containerName);
        }
        else { // SAS token
            let url = data.accountSASToken;
            if (!url.startsWith('https://')) {
                url = `https://${data.accountName}.blob.core.windows.net${data.accountSASToken}`;
            }
            const blobClient = new storage_blob_1.BlobServiceClient(url);
            this.client = blobClient.getContainerClient(data.containerName);
        }
    }
    /**
     * Get status of a path.
     * @param path The path.
     */
    async getinfo(path) {
        const blobClient = this.client.getBlockBlobClient(path);
        try {
            const properties = await blobClient.getProperties();
            if (!properties.metadata || !properties.metadata.hdi_isfolder) {
                return {
                    size: properties.contentLength,
                    type: 'file',
                    mtime: properties.lastModified
                };
            }
            else {
                return {
                    type: 'directory',
                    mtime: properties.lastModified
                };
            }
        }
        catch (err) {
            if (err.details && err.details.errorCode === 'BlobNotFound') {
                const iter = await this.client.listBlobsByHierarchy('/', {
                    prefix: path.endsWith('/') ? path : path + '/',
                    includeMetadata: true
                }).byPage({
                    continuationToken: undefined,
                    maxPageSize: 1
                }).next();
                const prefixes = iter.value.segment.blobPrefixes;
                const blobs = iter.value.segment.blobItems;
                if ((prefixes && prefixes.length > 0) || blobs.length > 0) {
                    return {
                        type: 'directory'
                    };
                }
            }
            console.log(err);
            throw err;
        }
    }
    async listdir(path) {
        try {
            const result = [];
            const currentPrefixes = new Set();
            let currentContinuationToken;
            let iter;
            do {
                iter = await this.client.listBlobsByHierarchy('/', {
                    prefix: path.endsWith('/') ? path : path + '/',
                    includeMetadata: true
                }).byPage({
                    continuationToken: currentContinuationToken,
                    maxPageSize: 20
                }).next();
                currentContinuationToken = iter.value.continuationToken;
                const prefixes = iter.value.segment.blobPrefixes;
                if (prefixes) {
                    prefixes.forEach(item => {
                        result.push(Path.basename(item.name));
                        currentPrefixes.add(item.name);
                    });
                }
                const blobs = iter.value.segment.blobItems;
                for (const blob of blobs) {
                    if (blob.metadata && blob.metadata.hdi_isfolder && blob.metadata.hdi_isfolder === 'true') {
                        if (currentPrefixes.has(`${blob.name}/`)) {
                            continue;
                        }
                    }
                    result.push(Path.basename(blob.name));
                }
            } while (currentContinuationToken);
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async makedir(path, mode) {
        try {
            await this.client.getBlockBlobClient(path).upload('', 0, {
                metadata: {
                    hdi_isfolder: 'true'
                }
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async upload(localPath, remotePath, opts) {
        try {
            const blobClient = this.client.getBlockBlobClient(remotePath);
            await blobClient.uploadFile(localPath);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async download(remotePath, localPath, opts) {
        try {
            const blobClient = this.client.getBlockBlobClient(remotePath);
            await blobClient.downloadToFile(localPath);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async delete(path) {
        try {
            const blobClient = this.client.getBlockBlobClient(path);
            await blobClient.delete();
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async deleteFolder(path) {
        try {
            const info = await this.getinfo(path);
            if (info.type === 'file') {
                await this.client.deleteBlob(path);
            }
            else {
                await this.deleteBlobsByHierarchy(this.client, path);
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async deleteBlobsByHierarchy(client, prefix) {
        const iter = client.listBlobsByHierarchy('/', {
            prefix: prefix.endsWith('/') ? prefix : prefix + '/'
        });
        let blobItem = await iter.next();
        while (!blobItem.done) {
            const blob = blobItem.value;
            if (blob.kind === 'blob') {
                await client.deleteBlob(blob.name);
            }
            else {
                try {
                    await client.deleteBlob(blob.name.slice(0, -1));
                }
                catch { }
                await this.deleteBlobsByHierarchy(client, blob.name);
            }
            blobItem = await iter.next();
        }
    }
}
exports.AzureBlobClient = AzureBlobClient;
