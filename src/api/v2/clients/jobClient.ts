// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    IJobConfig, IJobInfo, IJobSshInfo, IJobStatus, IPAICluster
} from '@api/v2';
import { Util } from '@pai/commom/util';
import * as yaml from 'js-yaml';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * List jobs, will call /api/v2/jobs.
     * @param query The query string.
     */
    public async list(query?: string): Promise<IJobInfo[]> {
        const url: string = query === undefined ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`, this.cluster.https) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs?${query}`, this.cluster.https);
        return await this.httpClient.get(url);
    }

    /**
     * Get job detail, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async get(userName: string, jobName: string): Promise<IJobStatus> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`,
            this.cluster.https
        );
        return await this.httpClient.get(url);
    }

    /**
     * Get job config, will call /api/v2/jobs/{userName}~{jobName}/config.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getConfig(userName: string, jobName: string): Promise<IJobConfig> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`,
            this.cluster.https
        );
        return await this.httpClient.get(url, {
            200: (data) => yaml.safeLoad(data)
        });
    }

    /**
     * Start or stop a job, will call /api/v1/user/{userName}/jobs/{jobName}/executionType.
     * @param userName The user name.
     * @param jobName The job name.
     * @param type 'START' or 'STOP'.
     */
    public async execute(userName: string, jobName: string, type: 'START' | 'STOP'): Promise<any> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}/executionType`,
            this.cluster.https
        );
        return await this.httpClient.put(url, JSON.stringify({ value: type }));
    }

    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    public async submit(jobConfig: IJobConfig): Promise<void> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/jobs`,
            this.cluster.https
        );
        const text: string = yaml.safeDump(jobConfig);

        await this.httpClient.post(url, text, undefined, {
            headers: {
                'Content-Type': 'text/yaml'
            }
        });
    }

    /**
     * Get job SSH information, will call /api/v1/user/${userName}/jobs/${jobName}/ssh.
     * @param userName The user name.
     * @param jobName The job name.
     */
    // tslint:disable-next-line: unified-signatures
    public async getSshInfo(userName: string, jobName: string): Promise<IJobSshInfo>;

    /**
     * Get job SSH information, will call /api/v1/jobs/${jobName}/ssh.
     * @param jobName The job name.
     */
    public async getSshInfo(jobName: string): Promise<IJobSshInfo>;

    public async getSshInfo(param1: string, param2?: string): Promise<IJobSshInfo> {
        const userName: string | undefined = param2 ? param1 : undefined;
        const jobName: string | undefined = param2 ? param2 : param1;

        const url: string = userName ?
            Util.fixUrl(
                `${this.cluster.rest_server_uri}/api/v1/user/${userName}/jobs/${jobName}/ssh`,
                this.cluster.https
            ) :
            Util.fixUrl(
                `${this.cluster.rest_server_uri}/api/v1/jobs/${jobName}/ssh`,
                this.cluster.https
            );

        return this.httpClient.get(url);
    }
}
