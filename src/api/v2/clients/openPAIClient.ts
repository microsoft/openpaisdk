// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';
import {
    AuthnClient,
    CacheClient,
    ICacheRecord,
    JobClient,
    OpenPAIBaseClient,
    StorageClient,
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

    constructor(cluster: IPAICluster, cache?: ICacheRecord[]) {
        super(cluster);
        this.job = new JobClient(cluster);
        this.user = new UserClient(cluster);
        this.virtualCluster = new VirtualClusterClient(cluster);
        this.authn = new AuthnClient(cluster);
        this.storage = new StorageClient(cluster);

        this.cache = new CacheClient(cache);
        this.cache.delegate(this.storage, this.storage.getStorages);
        this.cache.delegate(this.storage, this.storage.getStorageByName);
    }
}
