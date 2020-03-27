"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const baseClient_1 = require("./baseClient");
const cacheClient_1 = require("./cacheClient");
const jobClient_1 = require("./jobClient");
const storageClient_1 = require("./storageClient");
const userClient_1 = require("./userClient");
const virtualClusterClient_1 = require("./virtualClusterClient");
/**
 * OpenPAI Client.
 */
class OpenPAIClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster, cache) {
        super(cluster);
        this.job = new jobClient_1.JobClient(cluster);
        this.user = new userClient_1.UserClient(cluster);
        this.virtualCluster = new virtualClusterClient_1.VirtualClusterClient(cluster);
        this.authn = new __1.AuthnClient(cluster);
        this.storage = new storageClient_1.StorageClient(cluster);
        this.cache = new cacheClient_1.CacheClient(cache);
        this.cache.delegate(this.storage, this.storage.getStorages);
        this.cache.delegate(this.storage, this.storage.getStorageByName);
    }
}
exports.OpenPAIClient = OpenPAIClient;
