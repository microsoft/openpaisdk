// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IStorageDetail, IStorageSummary } from '@pai/v2';

/**
 * Storage test data.
 */
export const testStorageSummary: IStorageSummary = {
    storages: [
        { name: 'azureBlobStorage', share: true, volumeName: 'azBlobVol' }
    ]
};

export const testAzureBlobInfoShareKey: IStorageDetail = {
    name: 'azureBlobStorage',
    share: true,
    volumeName: 'azBlobVol',
    type: 'azureBlob',
    data: {
        containerName: 'containerName',
        accountName: 'accountName',
        accountKey: 'key'
    }
};

export const testAzureBlobInfoSasToken: IStorageDetail = {
    name: 'azureBlobStorage',
    share: true,
    volumeName: 'azBlobVol',
    type: 'azureBlob',
    data: {
        containerName: 'containerName',
        accountName: 'accountName',
        accountSASToken: 'queryString'
    }
};
