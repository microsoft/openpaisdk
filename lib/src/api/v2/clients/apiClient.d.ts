import { IPAICluster, IPAIClusterInfo } from "..";
import { OpenPAIBaseClient } from "./baseClient";
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
