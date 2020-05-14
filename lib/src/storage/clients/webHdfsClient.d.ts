import { IMountInfo, IStorageServer } from "../../api/v2/models/storage";
import { IFileInfo, IStorageNodeClient } from "../models/storageOperation";
/**
 * Web HDFS Client.
 */
export declare class WebHdfsClient implements IStorageNodeClient {
    mkdirAllowRecursive: boolean;
    constructor(config: IMountInfo, server: IStorageServer);
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string | undefined): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void>;
    delete(path: string): Promise<void>;
}
