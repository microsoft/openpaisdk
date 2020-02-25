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

import { PagedAsyncIterableIterator } from '@azure/core-paging';
import {
    BlobGetPropertiesResponse,
    BlobItem,
    BlobPrefix,
    BlobServiceClient,
    BlockBlobClient,
    ContainerClient,
    ContainerListBlobHierarchySegmentResponse,
    StorageSharedKeyCredential
} from '@azure/storage-blob';
import * as Path from 'path';

import { IMountInfo, IStorageServer } from '..';
import { IFileInfo, IStorageNodeClient } from '../models/storageOperation';

export type BlobIter = PagedAsyncIterableIterator<({
    kind: 'prefix';
} & BlobPrefix) | ({
    kind: 'blob';
} & BlobItem), ContainerListBlobHierarchySegmentResponse>;

export type BlobEntity = {
    done?: boolean | undefined;
    value: ({
        kind: 'prefix';
    } & BlobPrefix) | ({
        kind: 'blob';
    } & BlobItem);
};

export type BlobValue = ({
    kind: 'prefix';
} & BlobPrefix) | ({
    kind: 'blob';
} & BlobItem);

/**
 * Azure Blob Storage Client.
 */
export class AzureBlobClient implements IStorageNodeClient {
    public mkdirAllowRecursive: boolean = true;

    public config: IMountInfo;
    public server: IStorageServer;
    private client: ContainerClient;

    constructor(config: IMountInfo, server: IStorageServer) {
        if (server.type !== 'azureblob' ||
            !server.data ||
            !server.data.key ||
            !server.data.containerName
        ) {
            throw new Error('Can\'t connect to the server.');
        }

        const credential: StorageSharedKeyCredential =
            new StorageSharedKeyCredential(server.data.accountName, server.data.key);
        const blobClient: BlobServiceClient = new BlobServiceClient(
            `https://${server.data.accountName}.blob.core.windows.net`, credential);

        this.config = config;
        this.server = server;
        this.client = blobClient.getContainerClient(server.data.containerName);
    }

    /**
     * Get status of a path.
     * @param path The path.
     */
    public async getinfo(path: string): Promise<IFileInfo> {
        const blobClient: BlockBlobClient = this.client.getBlockBlobClient(path);
        try {
            const properties: BlobGetPropertiesResponse = await blobClient.getProperties();
            if (!properties.metadata || !properties.metadata.hdi_isfolder) {
                return <IFileInfo> {
                    size: properties.contentLength,
                    type: 'file',
                    mtime: properties.lastModified
                };
            } else {
                return <IFileInfo> {
                    type: 'directory',
                    mtime: properties.lastModified
                };
            }
        } catch (err) {
            if (err.details && err.details.errorCode === 'BlobNotFound') {
                const iter: IteratorResult<ContainerListBlobHierarchySegmentResponse> =
                    await this.client.listBlobsByHierarchy('/', {
                        prefix: path.endsWith('/') ? path : path + '/',
                        includeMetadata: true
                    }).byPage({
                        continuationToken: undefined,
                        maxPageSize: 1
                    }).next();
                const prefixes: BlobPrefix[] | undefined = iter.value.segment.blobPrefixes;
                const blobs: BlobItem[] = iter.value.segment.blobItems;
                if ((prefixes && prefixes.length > 0) || blobs.length > 0) {
                    return <IFileInfo> {
                        type: 'directory'
                    };
                }
            }
            console.log(err);
            throw err;
        }
    }

    public async listdir(path: string): Promise<string[]> {
        try {
            const result: string[] = [];
            const currentPrefixes: Set<string> = new Set<string>();
            let currentContinuationToken: string | undefined;
            let iter: IteratorResult<ContainerListBlobHierarchySegmentResponse>;
            do {
                iter = await this.client.listBlobsByHierarchy('/', {
                    prefix: path.endsWith('/') ? path : path + '/',
                    includeMetadata: true
                }).byPage({
                    continuationToken: currentContinuationToken,
                    maxPageSize: 20
                }).next();
                currentContinuationToken = iter.value.continuationToken;
                const prefixes: BlobPrefix[] | undefined = iter.value.segment.blobPrefixes;
                if (prefixes) {
                    prefixes.forEach(item => {
                        result.push(Path.basename(item.name));
                        currentPrefixes.add(item.name);
                    });
                }
                const blobs: BlobItem[] = iter.value.segment.blobItems;
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
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async makedir(path: string, mode?: string | undefined): Promise<void> {
        try {
            await this.client.getBlockBlobClient(path).upload('', 0, {
                metadata: {
                    hdi_isfolder: 'true'
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void> {
        try {
            const blobClient: BlockBlobClient = this.client.getBlockBlobClient(remotePath);
            await blobClient.uploadFile(localPath);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void> {
        try {
            const blobClient: BlockBlobClient = this.client.getBlockBlobClient(remotePath);
            await blobClient.downloadToFile(localPath);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async delete(path: string): Promise<void> {
        try {
            const blobClient: BlockBlobClient = this.client.getBlockBlobClient(path);
            await blobClient.delete();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async deleteFolder(path: string): Promise<void> {
        try {
            const info: IFileInfo = await this.getinfo(path);
            if (info.type === 'file') {
                await this.client.deleteBlob(path);
            } else {
                await this.deleteBlobsByHierarchy(this.client, path);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    private async deleteBlobsByHierarchy(client: ContainerClient, prefix: string): Promise<void> {
        const iter: BlobIter = client.listBlobsByHierarchy('/', {
            prefix: prefix.endsWith('/') ? prefix : prefix + '/'
        });
        let blobItem: BlobEntity = await iter.next();
        while (!blobItem.done) {
            const blob: BlobValue = blobItem.value;
            if (blob.kind === 'blob') {
                await client.deleteBlob(blob.name);
            } else {
                try {
                    await client.deleteBlob(blob.name.slice(0, -1));
                } catch { }
                await this.deleteBlobsByHierarchy(client, blob.name);
            }
            blobItem = await iter.next();
        }
    }
}
