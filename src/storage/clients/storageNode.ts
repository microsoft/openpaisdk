// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBlobClient, IAzureBlobCfg } from '../clients/azureBlobClient';
import { IFileInfo, IStorageNode, IStorageNodeClient } from '../models/storageOperation';

/**
 * Essential information for accessing a storage
 */
export type IStorageDispatcher = {
    type: 'azureBlob';
    data: IAzureBlobCfg;
} | {
    type: 'hdfs';
    data: object;
};

/**
 * StorageNode class.
 */

export class StorageNode<T> implements IStorageNode<T> {
    public config: T;
    public client: IStorageNodeClient;

    constructor(config: T) {
        this.config = config;
        const cfgDisp: IStorageDispatcher = this.storageConfigDispatcher(config);
        switch (cfgDisp.type) {
            case 'azureBlob': this.client = new AzureBlobClient(cfgDisp.data);
            default: throw new Error('NotImplemented');
        }
    }

    public storageConfigDispatcher(config: T): IStorageDispatcher {
        throw Error('NotImplemented');
    }

    public async getinfo(path: string): Promise<IFileInfo> {
        return this.client.getinfo(path);
    }

    public async listdir(path: string): Promise<string[]> {
        return this.client.listdir(path);
    }

    public async makedir(path: string, mode?: string | undefined): Promise<void> {
        try {
            return this.client.makedir(path);
        } catch (e) {
            if (!this.client.mkdirAllowRecursive) {
                // do something recursively
            }
        }
    }

    public async upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void> {
        return this.client.upload(localPath, remotePath, opts);
    }

    public async download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void> {
        return this.client.download(remotePath, localPath, opts);
    }

    public async delete(path: string): Promise<void> {
        return this.client.delete(path);
    }

    public existsSync(path: string): boolean {
        throw new Error('Method not implemented.');
    }

    public isdirSync(path: string): boolean {
        throw new Error('Method not implemented.');
    }

    /* handle folder opation
     * if this.client has corresponding folder operation, use it
     * otherwise implement it recursively
     */
    public async uploadFolder(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void> {
        if (this.client.uploadFolder) {
            return this.client.uploadFolder(localPath, remotePath, opts);
        } else {
            // TODO: handle upload recursively here
            throw new Error('Method not implemented.');
        }
    }

    public async downloadFolder(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void> {
        if (this.client.downloadFolder) {
            return this.client.downloadFolder(remotePath, localPath, opts);
        } else {
            // TODO: handle download recursively here
            throw new Error('Method not implemented.');
        }
    }

    public async deleteFolder(path: string): Promise<void> {
        if (this.client.deleteFolder) {
            return this.client.deleteFolder(path);
        } else {
            // TODO: handle deletion recursively here
            throw new Error('Method not implemented.');
        }
    }
}
