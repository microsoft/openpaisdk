"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Storage test data.
 */
exports.testStorageSummary = {
    storages: [
        { name: 'azureBlobStorage', share: true, volumeName: 'azBlobVol' }
    ]
};
exports.testAzureBlobInfoShareKey = {
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
exports.testAzureBlobInfoSasToken = {
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
