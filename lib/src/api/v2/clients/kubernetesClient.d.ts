import { IPAICluster } from "..";
import { OpenPAIBaseClient } from "./baseClient";
/**
 * OpenPAI Kubernetes client.
 */
export declare class KubernetesClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get kubernetes node list. Need administrator permission.
     */
    getK8sNodes(): Promise<any>;
    /**
     * Get kubernetes pod list.
     */
    getK8sPods(): Promise<any>;
}
