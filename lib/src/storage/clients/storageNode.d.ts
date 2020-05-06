import { IAzureBlobCfg } from '../clients/azureBlobClient';
import { IFileInfo, IStorageNode, IStorageNodeClient } from '../models/storageOperation';
/**
 * Essential information for accessing a storage
 */
export declare type IStorageDispatcher = {
    type: 'azureBlob';
    data: IAzureBlobCfg;
} | {
    type: 'hdfs';
    data: object;
};
/**
 * StorageNode class.
 */
export declare class StorageNode<T> implements IStorageNode<T> {
    config: T;
    client: IStorageNodeClient;
    constructor(config: T);
    storageConfigDispatcher(config: T): IStorageDispatcher;
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string | undefined): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void>;
    delete(path: string): Promise<void>;
    existsSync(path: string): boolean;
    isdirSync(path: string): boolean;
    uploadFolder(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void>;
    downloadFolder(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void>;
    deleteFolder(path: string): Promise<void>;
}
