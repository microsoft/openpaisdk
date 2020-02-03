import { IPAICluster } from '../models/cluster';
import { IJobConfig, IJobConfigV1, IJobFrameworkInfo, IJobInfo, IJobSshInfo, IJobStatus } from '../models/job';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * List jobs, will call /api/v1/jobs.
     * @param query The query string.
     */
    list(query?: string): Promise<IJobInfo[]>;
    /**
     * Get job status, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    get(userName: string, jobName: string): Promise<IJobStatus>;
    /**
     * Delete a job, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     * @param token Specific an access token (optional).
     */
    delete(userName: string, jobName: string, token?: string): Promise<IJobStatus>;
    /**
     * Get job framework info, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getFrameworkInfo(userName: string, jobName: string): Promise<IJobFrameworkInfo>;
    /**
     * Get job config, will call /api/v2/jobs/{userName}~{jobName}/config.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getConfig(userName: string, jobName: string): Promise<IJobConfig>;
    /**
     * Start or stop a job, will call /api/v1/user/{userName}/jobs/{jobName}/executionType.
     * @param userName The user name.
     * @param jobName The job name.
     * @param type 'START' or 'STOP'.
     * @param token Specific an access token (optional).
     */
    execute(userName: string, jobName: string, type: 'START' | 'STOP', token?: string): Promise<any>;
    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    submit(jobConfig: IJobConfig, token?: string): Promise<void>;
    /**
     * Submit a v1 job, will call /api/v1/user/{username}/jobs.
     * @param jobConfig The job config.
     */
    submitV1(userName: string, jobConfig: IJobConfigV1, token?: string): Promise<void>;
    /**
     * Get job SSH infomation, will call /api/v1/user/${userName}/jobs/${jobName}/ssh.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getSshInfo(userName: string, jobName: string): Promise<IJobSshInfo>;
    /**
     * Get job SSH infomation, will call /api/v1/jobs/${jobName}/ssh.
     * @param jobName The job name.
     */
    getSshInfo(jobName: string): Promise<IJobSshInfo>;
}
