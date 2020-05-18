// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';
import {
    ApiClient,
    AuthnClient,
    CacheClient,
    GroupClient,
    ICacheRecord,
    JobClient,
    JobHistoryClient,
    KubernetesClient,
    OpenPAIBaseClient,
    StorageClient,
    TokenClient,
    UserClient,
    VirtualClusterClient
} from '@api/v2/clients';

/**
 * OpenPAI Client.
 */
export class OpenPAIClient extends OpenPAIBaseClient {
    /**
     * OpenPAI Job Client.
     */
    public job: JobClient;

    /**
     * OpenPAI User Client.
     */
    public user: UserClient;

    /**
     * OpenPAI Token Client.
     */
    public token: TokenClient;

    /**
     * OpenPAI Virtual Cluster Client.
     */
    public virtualCluster: VirtualClusterClient;

    /**
     * OpenPAI Authn Client.
     */
    public authn: AuthnClient;

    /**
     * OpenPAI Storage Client.
     */
    public storage: StorageClient;

    /**
     * OpenPAI cluster cache client
     */
    public cache: CacheClient;

    /**
     * OpenPAI Group Client.
     */
    public group: GroupClient;

    /**
     * OpenPAI API info Client.
     */
    public api: ApiClient;

    /**
     * OpenPAI job history Client.
     */
    public jobHistory: JobHistoryClient;

    /**
     * OpenPAI kubernetes Client.
     */
    public kubernetes: KubernetesClient;

    constructor(cluster: IPAICluster, cache?: ICacheRecord[]) {
        super(cluster);
        this.job = new JobClient(cluster);
        this.token = new TokenClient(cluster);
        this.user = new UserClient(cluster);
        this.virtualCluster = new VirtualClusterClient(cluster);
        this.authn = new AuthnClient(cluster);
        this.storage = new StorageClient(cluster);
        this.group = new GroupClient(cluster);
        this.api = new ApiClient(cluster);
        this.jobHistory = new JobHistoryClient(cluster);
        this.kubernetes = new KubernetesClient(cluster);

        this.cache = new CacheClient(cache);
        this.cache.delegate(this.storage, this.storage.getStorages);
        this.cache.delegate(this.storage, this.storage.getStorage);
    }
}
