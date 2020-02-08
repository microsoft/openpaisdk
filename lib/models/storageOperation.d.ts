/**
 * An abstractful File System based on file operation
 */
export declare enum FileType {
    FILE = 0,
    DIRECTORY = 1
}
export interface IFileInfo {
    mode: string;
    owner: string;
    group: string;
    size: number;
    blksize: number;
    type: FileType;
    atime: Date;
    mtime: Date;
}
export interface IStorageNode {
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string): void;
    upload(localPath: string, remotePath: string, opts?: {}): void;
    download(remotePath: string, localPath: string, opts?: {}): void;
    delete(path: string): void;
    existsSync(path: string): boolean;
    isdirSync(path: string): boolean;
    uploadFolder(localPath: string, remotePath: string, opts?: {}): void;
    downloadFolder(remotePath: string, localPath: string, opts?: {}): void;
}
