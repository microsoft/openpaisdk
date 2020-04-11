import { IStorageDetail } from '@pai/v2';
import { IFileInfo, IStorageNode, IStorageNodeClient } from '@pai/v2/models/storageOperation';
/**
 * StorageNode class.
 */
export declare class StorageNode implements IStorageNode {
    config: IStorageDetail;
    client: IStorageNodeClient;
    constructor(config: IStorageDetail);
    /**
     * create client according to type.
     */
    createClient(): IStorageNodeClient;
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
