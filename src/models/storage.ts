// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenPAI storage information.
 */
export interface IStorageServer {
    spn: string;
    type: 'nfs' | 'samba' | 'azurefile' | 'azureblob' | 'hdfs' | 'other';
    data: {
        [prop: string]: any;
    };
    extension: any;
}

export interface IStorageConfig {
    name: string;
    gpn?: string;
    default: boolean;
    servers?: string[];
    mountInfos: IMountInfo[];
}

export interface IMountInfo {
    mountPoint: string;
    server: string;
    path: string;
    permission?: string;
}

export interface IStorageSummaryItem {
    name: string;
    share: boolean;
    volumeName: string;
}

export interface IStorageSummary {
    storages: IStorageSummaryItem[];
}

export interface INfsCfg {
    server: string;
    path: string;
}

export interface ISambaCfg {
    address: string;
    username?: string;
    password?: string;
}

export interface IAzureFileCfg {
    shareName: string;
    accountName?: string;
    accountKey?: string;
}

export interface IAzureBlobCfg {
    containerName: string;
    accountName?: string;
    accountKey?: string;
    accountSASToken?: string;
}

export interface IStorageDetail extends IStorageSummaryItem {
    type: 'nfs' | 'samba' | 'azureFile' | 'azureBlob' | 'other' | 'unknown';
    data: INfsCfg | ISambaCfg | IAzureBlobCfg | IAzureFileCfg | Object;
    secretName?: string;
    mountOptions?: string[];
}
