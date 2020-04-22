import { IPAICluster, IPAIClusterInfo } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Api client.
 */
export declare class ApiClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get OpenPAI cluster info.
     */
    getClusterInfo(): Promise<IPAIClusterInfo>;
}
