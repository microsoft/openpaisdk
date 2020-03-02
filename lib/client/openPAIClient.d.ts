import { AuthnClient } from '..';
import { IPAICluster } from '../models/cluster';
import { OpenPAIBaseClient } from './baseClient';
import { JobClient } from './jobClient';
import { StorageClient } from './storageClient';
import { UserClient } from './userClient';
import { VirtualClusterClient } from './virtualClusterClient';
import { CacheClient, ICacheRecord } from './cacheClient';
/**
 * OpenPAI Client.
 */
export declare class OpenPAIClient extends OpenPAIBaseClient {
    /**
     * OpenPAI Job Client.
     */
    job: JobClient;
    /**
     * OpenPAI User Client.
     */
    user: UserClient;
    /**
     * OpenPAI Virtual Cluster Client.
     */
    virtualCluster: VirtualClusterClient;
    /**
     * OpenPAI Authn Client.
     */
    authn: AuthnClient;
    /**
     * OpenPAI Storage Client.
     */
    storage: StorageClient;
    /**
     * OpenPAI cluster cache client
     */
    cache: CacheClient;
    constructor(cluster: IPAICluster, cache?: ICacheRecord[]);
}
