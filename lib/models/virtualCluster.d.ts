/**
 * OpenPAI Virtual Cluster.
 */
export interface IVirtualCluster {
    /** capacity percentage this virtual cluster can use of entire cluster */
    capacity: number;
    /** max capacity percentage this virtual cluster can use of entire cluster */
    maxCapacity: number;
    /** used capacity percentage this virtual cluster can use of entire cluster */
    usedCapacity: number;
    numActiveJobs: number;
    numJobs: number;
    numPendingJobs: number;
    resourcesUsed: {
        memory: number;
        vCores: number;
        GPUs: number;
    };
    resourcesTotal: {
        memory: number;
        vCores: number;
        GPUs: number;
    };
    dedicated: boolean;
    /** available node list for this virtual cluster */
    nodeList: string[];
    /**
     * RUNNING: vc is enabled.
     * STOPPED: vc is disabled, without either new job or running job.
     * DRAINING: intermedia state from RUNNING to STOPPED, in waiting on existing job.
     */
    status: 'RUNNING' | 'STOPPED' | 'DRAINING';
}
/**
 * OpenPAI Virtual Cluster Node Resource.
 */
export interface INodeResource {
    gpuTotal: number;
    gpuUsed: number;
    gpuAvaiable: number;
}
