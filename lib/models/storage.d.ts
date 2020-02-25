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
