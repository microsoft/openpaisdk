// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    IJobConfig, IJobInfo, IJobSshInfo, IJobStatus, IPAICluster, IPAIResponse
} from '@api/v2';
import { Util } from '@pai/commom/util';
import * as yaml from 'js-yaml';

import { IEventListQuery, IJobListQeury } from '../models/job';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Submit a job in the system.
     * @param jobConfig The job config.
     */
    public async createJob(jobConfig: IJobConfig): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs`,
            this.cluster.https
        );
        const text: string = yaml.safeDump(jobConfig);

        return await this.httpClient.post(url, text, undefined, {
            headers: {
                'content-type': 'text/yaml'
            }
        });
    }

    /**
     * Get the list of jobs.
     * @param query filter jobs by username, vc, state and keyword. Set offset, limit, order and withTotalCount.
     */
    public async listJobs(query?: IJobListQeury): Promise<IJobInfo[] | { totalCount: number, data: IJobInfo[] }> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs`,
            this.cluster.https
        );
        return await this.httpClient.get(
            url, undefined, undefined, query
        );
    }

    /**
     * Get job status.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getJob(userName: string, jobName: string): Promise<IJobStatus> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get job configuration.
     * This API always returns job config in v2 format (text/yaml).
     * Old job config in v1 format will be converted automatically.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getJobConfig(userName: string, jobName: string): Promise<IJobConfig> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`,
            this.cluster.https
        );
        return await this.httpClient.get(url, {
            200: (data) => yaml.safeLoad(data)
        });
    }

    /**
     * Start or stop a job.
     * @param userName The user name.
     * @param jobName The job name.
     * @param type 'START' or 'STOP'.
     */
    public async updateJobExecutionType(userName: string, jobName: string, type: 'START' | 'STOP'): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/executionType`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { value: type });
    }

    /**
     * Add a tag.
     * @param userName The user name.
     * @param jobName The job name.
     * @param tag The tag.
     */
    public async addTag(userName: string, jobName: string, tag: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/tag`,
            this.cluster.https
        );
        return await this.httpClient.put(url, { value: tag });
    }

    /**
     * Delelte a tag.
     * @param userName The user name.
     * @param jobName The job name.
     * @param tag The tag.
     */
    public async deleteTag(userName: string, jobName: string, tag: string): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/tag`,
            this.cluster.https
        );
        return await this.httpClient.delete(url, undefined, { data: { value: tag } });
    }

   /**
    * Get the events of a job.
    * @param userName The user name.
    * @param jobName The job name.
    * @param query filter jobs by event type
    */
  public async listEvents(userName: string, jobName: string, query?: IEventListQuery): Promise<any> {
    const url: string = Util.fixUrl(
      `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/events`,
      this.cluster.https
    );
    return await this.httpClient.get(url, undefined, undefined, query);
  }
}
