import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { BlobItem, BlobPrefix, ContainerListBlobHierarchySegmentResponse } from '@azure/storage-blob';
import { IStorageDetail } from '@pai/v2/models/storage';
import { IFileInfo, IStorageNodeClient } from '@pai/v2/models/storageOperation';
export declare type BlobIter = PagedAsyncIterableIterator<({
    kind: 'prefix';
} & BlobPrefix) | ({
    kind: 'blob';
} & BlobItem), ContainerListBlobHierarchySegmentResponse>;
export declare type BlobEntity = {
    done?: boolean | undefined;
    value: ({
        kind: 'prefix';
    } & BlobPrefix) | ({
        kind: 'blob';
    } & BlobItem);
};
export declare type BlobValue = ({
    kind: 'prefix';
} & BlobPrefix) | ({
    kind: 'blob';
} & BlobItem);
/**
 * Azure Blob Storage Client.
 */
export declare class AzureBlobClient implements IStorageNodeClient {
    mkdirAllowRecursive: boolean;
    config: IStorageDetail;
    private client;
    constructor(config: IStorageDetail);
    /**
     * Get status of a path.
     * @param path The path.
     */
    getinfo(path: string): Promise<IFileInfo>;
    listdir(path: string): Promise<string[]>;
    makedir(path: string, mode?: string | undefined): Promise<void>;
    upload(localPath: string, remotePath: string, opts?: {} | undefined): Promise<void>;
    download(remotePath: string, localPath: string, opts?: {} | undefined): Promise<void>;
    delete(path: string): Promise<void>;
    deleteFolder(path: string): Promise<void>;
    private deleteBlobsByHierarchy;
}
