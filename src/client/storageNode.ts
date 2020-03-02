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

import { AzureBlobClient } from '..';
import { IStorageDetail } from '../models/storage';
import { IFileInfo, IStorageNode, IStorageNodeClient } from '../models/storageOperation';

/**
 * StorageNode class.
 */
export class StorageNode implements IStorageNode {
    public config: IStorageDetail;
    public client: IStorageNodeClient;

    constructor(config: IStorageDetail) {
        this.config = config;
        this.client = this.createClient();
    }

    /**
     * create client according to type.
     */
    public createClient(): IStorageNodeClient {
        switch (this.config.type) {
            case 'azureBlob': return new AzureBlobClient(this.config);
            default: throw new Error(`NotImplemented`);
        }
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
