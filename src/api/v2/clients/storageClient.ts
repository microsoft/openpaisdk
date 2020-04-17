// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';
import { IStorageDetail, IStorageSummary } from '@api/v2/models/storage';
import { Util } from '@pai/commom/util';
import { IAzureBlobCfg } from '@pai/storage/clients/azureBlobClient';
import { IStorageDispatcher, StorageNode } from '@pai/storage/clients/storageNode';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class StorageClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get storage list for which current user has permissions.
     */
    public async getStorages(): Promise<IStorageSummary> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/storages`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get storage for the given name.
     * @param name The name of storage.
     */
    public async getStorage(name: string): Promise<IStorageDetail> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/storages/${name}`,
            this.cluster.https
        );
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
