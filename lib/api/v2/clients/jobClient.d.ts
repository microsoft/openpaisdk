import { IJobConfig, IJobInfo, IJobSshInfo, IJobStatus, IPAICluster } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Job client.
 */
export declare class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * List jobs, will call /api/v2/jobs.
     * @param query The query string.
     */
    list(query?: string): Promise<IJobInfo[]>;
    /**
     * Get job detail, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    get(userName: string, jobName: string): Promise<IJobStatus>;
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
     */
    execute(userName: string, jobName: string, type: 'START' | 'STOP'): Promise<any>;
    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    submit(jobConfig: IJobConfig): Promise<void>;
    /**
     * Get job SSH information, will call /api/v1/user/${userName}/jobs/${jobName}/ssh.
     * @param userName The user name.
     * @param jobName The job name.
     */
    getSshInfo(userName: string, jobName: string): Promise<IJobSshInfo>;
    /**
     * Get job SSH information, will call /api/v1/jobs/${jobName}/ssh.
     * @param jobName The job name.
     */
    getSshInfo(jobName: string): Promise<IJobSshInfo>;
}
