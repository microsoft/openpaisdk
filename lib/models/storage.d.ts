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
export interface IStorageDetail extends IStorageSummaryItem {
    type?: 'nfs' | 'samba' | 'azureFile' | 'azureBlob' | 'other' | 'unknown';
    data?: {
        server?: string;
        path?: string;
        address?: string;
        username?: string;
        password?: string;
        shareName?: string;
        containerName?: string;
        accountName?: string;
        accountKey?: string;
    };
    secretName?: string;
    mountOptions?: string[];
}
