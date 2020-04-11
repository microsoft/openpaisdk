import { IPAICluster } from '@pai/v2';
import { IStorageConfig, IStorageDetail, IStorageServer, IStorageSummary } from '@pai/v2/models/storage';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class StorageClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get storage informations.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    getServer(names?: string, token?: string): Promise<IStorageServer[]>;
    /**
     * Get storage information.
     * @param storage The storage name.
     */
    getServerByName(storage: string, token?: string): Promise<IStorageServer>;
    /**
     * Get storage config.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    getConfig(names?: string, token?: string): Promise<IStorageConfig[]>;
    /**
     * Get storage config.
     * @param storage The storage name.
     */
    getConfigByName(storage: string, token?: string): Promise<IStorageConfig>;
    getStorages(token?: string): Promise<IStorageSummary>;
    getStorageByName(name: string, token?: string): Promise<IStorageDetail>;
}
