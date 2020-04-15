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
        this.user = new clients_1.UserClient(cluster);
        this.virtualCluster = new clients_1.VirtualClusterClient(cluster);
        this.authn = new clients_1.AuthnClient(cluster);
        this.storage = new clients_1.StorageClient(cluster);
        this.cache = new clients_1.CacheClient(cache);
        this.cache.delegate(this.storage, this.storage.getStorages);
        this.cache.delegate(this.storage, this.storage.getStorageByName);
    }
}
exports.OpenPAIClient = OpenPAIClient;
