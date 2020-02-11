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
