import { IPAICluster } from '@api/v2';
import { AuthnClient, CacheClient, ICacheRecord, JobClient, OpenPAIBaseClient, StorageClient, UserClient, VirtualClusterClient } from '@api/v2/clients';
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
