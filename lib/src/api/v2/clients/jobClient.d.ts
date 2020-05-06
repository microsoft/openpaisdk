import { IJobConfig, IJobInfo, IJobStatus, IPAICluster, IPAIResponse } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Submit a job in the system.
     * @param jobConfig The job config.
     */
    createJob(jobConfig: IJobConfig): Promise<IPAIResponse>;
    /**
     * Get the list of jobs.
     * @param username filter jobs with username.
     */
    listJobs(username?: string): Promise<IJobInfo[]>;
    /**
     * Get job status.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getJob(userName: string, jobName: string): Promise<IJobStatus>;
    /**
     * Get job configuration.
     * This API always returns job config in v2 format (text/yaml).
     * Old job config in v1 format will be converted automatically.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getJobConfig(userName: string, jobName: string): Promise<IJobConfig>;
    /**
     * Start or stop a job.
     * @param userName The user name.
     * @param jobName The job name.
     * @param type 'START' or 'STOP'.
     */
    updateJobExecutionType(userName: string, jobName: string, type: 'START' | 'STOP'): Promise<any>;
}
