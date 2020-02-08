import { IStorageNode, IFileInfo } from '../models/storageOperation';
export declare class baseStorageNode implements IStorageNode {
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string | undefined): void;
    upload(localPath: string, remotePath: string, opts?: {} | undefined): void;
    download(remotePath: string, localPath: string, opts?: {} | undefined): void;
    delete(path: string): void;
    existsSync(path: string): boolean;
    isdirSync(path: string): boolean;
    uploadFolder(localPath: string, remotePath: string, opts?: {} | undefined): void;
    downloadFolder(remotePath: string, localPath: string, opts?: {} | undefined): void;
}
