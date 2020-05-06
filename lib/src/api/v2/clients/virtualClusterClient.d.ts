import { IPAICluster, IVirtualCluster } from '@api/v2';
import { ISkuType } from '../models/virtualCluster';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Virtual Cluster client.
 */
export declare class VirtualClusterClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get the list of virtual clusters.
     */
    listVirtualClusters(): Promise<{
        [id: string]: IVirtualCluster;
    }>;
    /**
     * Get virtual cluster status in the system.
     * @param vcName The name of virtual cluster.
     */
    getVirtualCluster(vcName: string): Promise<IVirtualCluster>;
    /**
     * Get sku types in the virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    getVirtualClusterSkuTypes(vcName: string): Promise<{
        [id: string]: ISkuType;
    }>;
}
