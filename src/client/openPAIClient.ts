// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthnClient } from '..';
import { IPAICluster } from '../models/cluster';

import { OpenPAIBaseClient } from './baseClient';
import { CacheClient, ICacheRecord } from './cacheClient';
import { JobClient } from './jobClient';
import { StorageClient } from './storageClient';
import { UserClient } from './userClient';
import { VirtualClusterClient } from './virtualClusterClient';

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
