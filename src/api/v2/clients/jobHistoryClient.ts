// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    IJobAttempt, IPAICluster, IPAIResponse
} from '@api/v2';
import { Util } from '@pai/commom/util';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class JobHistoryClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Check if job attempts is healthy.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getJobAttemptsHealthz(userName: string, jobName: string): Promise<IPAIResponse> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts/healthz`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get all attempts of a job.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getJobAttempts(userName: string, jobName: string): Promise<IJobAttempt[]> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get a specific attempt by attempt index.
     * @param userName The user name.
     * @param jobName The job name.
     * @param index The job attempt index.
     */
    public async getJobAttempt(
        userName: string, jobName: string, index: number
    ): Promise<IJobAttempt> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts/${index}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }
}
