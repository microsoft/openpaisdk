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

/**
 * An abstractful File System based on file operation
 */

import { IMountInfo, IStorageServer } from './storage';

export interface IFileInfo {
    mode: string;
    owner: string;
    group: string;
    size: number; // in unit of Byte
    blksize: number; // in unit of Byte
    type: 'file' | 'directory';
    atime: Date;
    mtime: Date;
}

export interface IStorageNode {
    // info
    config: IMountInfo;
    server: IStorageServer;
    // Essential methods
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    delete(path: string): Promise<void>;
    // Non-essential methods
    existsSync(path: string): boolean;
    isdirSync(path: string): boolean;
    uploadFolder(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    downloadFolder(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    deleteFolder(path: string): Promise<void>;
}

export interface IStorageNodeClient {
    /* should contain a constructor as below
     * new(config: IStorageConfig, server: IStorageServer): IStorageNodeClient
     */
    mkdirAllowRecursive: boolean; // whether makedir() could create parent directory recursively
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    delete(path: string): Promise<void>;
}
