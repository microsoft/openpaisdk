import { IPAICluster } from '../models/cluster';
export declare class LocalClustersManager {
    clustersFilePath: string;
    clusters: IPAICluster[];
    constructor(pth?: string | undefined, clusters?: IPAICluster[] | undefined);
    load(): Promise<void>;
    store(): Promise<void>;
}
