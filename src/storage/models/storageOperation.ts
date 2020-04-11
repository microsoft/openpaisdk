// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * An abstract File System based on file operation
 */

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

export interface IStorageNode<StorageCfgType> {
    // info
    config: StorageCfgType; // if contexted with api v2, StorageCfgType is IStorageDetail
    client?: IStorageNodeClient;
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
     * new(config: IStorageDetail): IStorageNodeClient
     */
    mkdirAllowRecursive: boolean; // whether makedir() could create parent directory recursively
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    delete(path: string): Promise<void>;

    uploadFolder?(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    downloadFolder?(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    deleteFolder?(path: string): Promise<void>;
}
