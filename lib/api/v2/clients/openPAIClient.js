"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("@api/v2/clients");
/**
 * OpenPAI Client.
 */
class OpenPAIClient extends clients_1.OpenPAIBaseClient {
    constructor(cluster, cache) {
        super(cluster);
        this.job = new clients_1.JobClient(cluster);
        this.token = new clients_1.TokenClient(cluster);
        this.user = new clients_1.UserClient(cluster);
        this.virtualCluster = new clients_1.VirtualClusterClient(cluster);
        this.authn = new clients_1.AuthnClient(cluster);
        this.storage = new clients_1.StorageClient(cluster);
        this.group = new clients_1.GroupClient(cluster);
        this.api = new clients_1.ApiClient(cluster);
        this.jobHistory = new clients_1.JobHistoryClient(cluster);
        this.kubernetes = new clients_1.KubernetesClient(cluster);
        this.cache = new clients_1.CacheClient(cache);
        this.cache.delegate(this.storage, this.storage.getStorages);
        this.cache.delegate(this.storage, this.storage.getStorage);
    }
}
exports.OpenPAIClient = OpenPAIClient;
