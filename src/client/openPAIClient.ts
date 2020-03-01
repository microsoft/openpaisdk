// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { AuthnClient } from '..';
import { IPAICluster } from '../models/cluster';

import { OpenPAIBaseClient } from './baseClient';
import { JobClient } from './jobClient';
import { StorageClient } from './storageClient';
import { StorageOperation } from './storageOperation';
import { UserClient } from './userClient';
import { VirtualClusterClient } from './virtualClusterClient';
import { CacheClient, ICacheRecord } from './cacheClient';

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

    /**
     * OpenPAI Storage Operation
     */
    public storageOperation: StorageOperation;

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

        this.storageOperation = new StorageOperation(this.storage);
    }
}
