import { IPAICluster } from '@api/v2';
import { ApiClient, AuthnClient, CacheClient, GroupClient, ICacheRecord, JobClient, JobHistoryClient, KubernetesClient, OpenPAIBaseClient, StorageClient, TokenClient, UserClient, VirtualClusterClient } from '@api/v2/clients';
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
     * OpenPAI Token Client.
     */
    token: TokenClient;
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
    /**
     * OpenPAI Group Client.
     */
    group: GroupClient;
    /**
     * OpenPAI API info Client.
     */
    api: ApiClient;
    /**
     * OpenPAI job history Client.
     */
    jobHistory: JobHistoryClient;
    /**
     * OpenPAI kubernetes Client.
     */
    kubernetes: KubernetesClient;
    constructor(cluster: IPAICluster, cache?: ICacheRecord[]);
}
