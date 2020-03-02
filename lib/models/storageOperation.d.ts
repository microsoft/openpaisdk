/**
 * An abstract File System based on file operation
 */
import { IStorageDetail } from './storage';
export interface IFileInfo {
    mode: string;
    owner: string;
    group: string;
    size: number;
    blksize: number;
    type: 'file' | 'directory';
    atime: Date;
    mtime: Date;
}
export interface IStorageNode {
    config: IStorageDetail;
    client?: IStorageNodeClient;
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    delete(path: string): Promise<void>;
    existsSync(path: string): boolean;
    isdirSync(path: string): boolean;
    uploadFolder(localPath: string, remotePath: string, opts?: {}): Promise<void>;
    downloadFolder(remotePath: string, localPath: string, opts?: {}): Promise<void>;
    deleteFolder(path: string): Promise<void>;
}
export interface IStorageNodeClient {
    mkdirAllowRecursive: boolean;
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
