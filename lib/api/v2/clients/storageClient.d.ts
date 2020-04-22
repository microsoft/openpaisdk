import { IPAICluster } from '@api/v2';
import { IStorageDetail, IStorageSummary } from '@api/v2/models/storage';
import { IStorageDispatcher, StorageNode } from '@pai/storage/clients/storageNode';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class StorageClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get storage list for which current user has permissions.
     */
    getStorages(): Promise<IStorageSummary>;
    /**
     * Get storage for the given name.
     * @param name The name of storage.
     */
    getStorage(name: string): Promise<IStorageDetail>;
}
/**
 * StorageNode accepting v2 storage detail
 */
export declare class StorageNodeV2 extends StorageNode<IStorageDetail> {
    storageConfigDispatcher(config: IStorageDetail): IStorageDispatcher;
}
