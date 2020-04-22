import { IJobAttempt, IPAICluster, IPAIResponse } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class JobHistoryClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Check if job attempts is healthy.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getJobAttemptsHealthz(userName: string, jobName: string): Promise<IPAIResponse>;
    /**
     * Get all attempts of a job.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getJobAttempts(userName: string, jobName: string): Promise<IJobAttempt[]>;
    /**
     * Get a specific attempt by attempt index.
     * @param userName The user name.
     * @param jobName The job name.
     * @param index The job attempt index.
     */
    getJobAttempt(userName: string, jobName: string, index: number): Promise<IJobAttempt>;
}
