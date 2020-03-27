// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IMountInfo, IStorageServer } from '../models/storage';
import { IFileInfo, IStorageNodeClient } from '../models/storageOperation';

/**
 * Web HDFS Client.
 */
export class WebHdfsClient implements IStorageNodeClient {
    public mkdirAllowRecursive: boolean = true;

    constructor(config: IMountInfo, server: IStorageServer) {
        throw new Error('Method not implemented.');
    }

    public async getinfo(path: string): Promise<IFileInfo> {
        throw new Error('Method not implemented.');
    }

    public async listdir(path: string): Promise<string[]> {
        throw new Error('Method not implemented.');
    }

    public async makedir(path: string, mode?: string | undefined): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async delete(path: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
