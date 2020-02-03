import { IPAICluster } from '../models/cluster';
import { INodeResource, IVirtualCluster } from '../models/virtualCluster';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Virtual Cluster client.
 */
export declare class VirtualClusterClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * list all virtual clusters.
     */
    list(): Promise<{
        [id: string]: IVirtualCluster;
    }>;
    /**
     * get a virtual cluster.
     * @param vcName The name of virtual cluster.
     */
    get(vcName: string): Promise<IVirtualCluster>;
    /**
     * get virtual cluster node resource.
     */
    getNodeResource(): Promise<{
        [id: string]: INodeResource;
    }>;
    /**
     * Create or update a new virtual cluster.
     * @param vcName The name of the new virtual cluster.
     * @param vcCapacity The new capacity.
     * @param vcMaxCapacity The new max capacity, range of [vcCapacity, 100].
     * @param token Specific an access token (optional).
     */
    createOrUpdate(vcName: string, vcCapacity: number, vcMaxCapacity: number, token?: string): Promise<any>;
    /**
     * Delete a virtual cluster.
     * @param vcName The virtual cluster name.
     * @param token Specific an access token (optional).
     */
    delete(vcName: string, token?: string): Promise<any>;
    /**
     * Change a virtual cluster's status.
     * @param vcName The virtual cluster name.
     * @param vcStatus The new status 'running' | 'stopped'.
     * @param token Specific an access token (optional).
     */
    changeStatus(vcName: string, vcStatus: 'running' | 'stopped', token?: string): Promise<any>;
}
