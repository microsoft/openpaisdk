// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// tslint:disable-next-line:match-default-export-name
import { IPAICluster } from '@api/v2';
import { IStorageConfig, IStorageDetail, IStorageServer, IStorageSummary } from '@api/v2/models/storage';
import { Util } from '@pai/commom/util';
import { IAzureBlobCfg } from '@pai/storage/clients/azureBlobClient';
import { IStorageDispatcher, StorageNode } from '@pai/storage/clients/storageNode';
import axios, { AxiosResponse } from 'axios';

import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export class StorageClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get storage informations.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    public async getServer(names?: string): Promise<IStorageServer[]> {
        const query: string = names ? `?names=${names}` : '';
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server${query}`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    /**
     * Get storage information.
     * @param storage The storage name.
     */
    public async getServerByName(storage: string): Promise<IStorageServer> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server/${storage}`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    /**
     * Get storage config.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    public async getConfig(names?: string): Promise<IStorageConfig[]> {
        const query: string = names ? `?names=${names}` : '';
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config${query}`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    /**
     * Get storage config.
     * @param storage The storage name.
     */
    public async getConfigByName(storage: string): Promise<IStorageConfig> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config/${storage}`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    public async getStorages(): Promise<IStorageSummary> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    public async getStorageByName(name: string): Promise<IStorageDetail> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages/${name}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}

/**
 * StorageNode accepting v2 storage detail
 */
export class StorageNodeV2 extends StorageNode<IStorageDetail> {
    public storageConfigDispatcher(config: IStorageDetail): IStorageDispatcher {
        if (config.type === 'azureBlob') {
            return {
                type: config.type,
                data: config.data as IAzureBlobCfg
            };
        }
        throw Error('NotImplemented');
    }
}
