// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import * as yaml from 'js-yaml';
import * as request from 'request-promise-native';

import { Util } from '../commom/util';
import { IPAICluster } from '../models/cluster';
import { IJobConfig, IJobConfigV1, IJobFrameworkInfo, IJobInfo, IJobSshInfo, IJobStatus } from '../models/job';
import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class JobClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster)
    }

    /**
     * List jobs, will call /api/v1/jobs.
     * @param query The query string.
     */
    public async list(query?: string): Promise<IJobInfo[]> {
        const url = query === undefined ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs`) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs?${query}`) ;
        return await request.get(url);
    }

    /**
     * Get job status, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async get(userName: string, jobName: string): Promise<IJobStatus> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}`);
        const res = await request.get(url);
        return JSON.parse(res);
    }

    /**
     * Delete a job, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     * @param token Specific an access token (optional).
     */
    public async delete(userName: string, jobName: string, token?: string): Promise<IJobStatus> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}`);
        if(token === undefined) {
            token = await super.token();
        }
        const res = await request.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: OpenPAIBaseClient.TIMEOUT
        });
        return JSON.parse(res);
    }

    /**
     * Get job framework info, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getFrameworkInfo(userName: string, jobName: string): Promise<IJobFrameworkInfo> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`);
        const res = await request.get(url);
        return JSON.parse(res);
    }

    /**
     * Get job config, will call /api/v2/jobs/{userName}~{jobName}/config.
     * @param userName The user name.
     * @param jobName The job name.
     */
    public async getConfig(userName: string, jobName: string): Promise<IJobConfig> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`);
        const res = await request.get(url);
        return yaml.safeLoad(res);
    }

    /**
     * Start or stop a job, will call /api/v1/user/{userName}/jobs/{jobName}/executionType.
     * @param userName The user name.
     * @param jobName The job name.
     * @param type 'START' or 'STOP'.
     * @param token Specific an access token (optional).
     */
    public async execute(userName: string, jobName: string, type: 'START' | 'STOP', token?: string): Promise<any> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}/executionType`);
        if(token === undefined) {
            token = await super.token();
        }
        const res = await request.put(url, {
            body: JSON.stringify({
                value: type
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: OpenPAIBaseClient.TIMEOUT
        });
        return JSON.parse(res);
    }

    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    public async submit(jobConfig: IJobConfig, token?: string): Promise<void> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`);
        const text = yaml.safeDump(jobConfig);
        if(token === undefined) {
            token = await super.token();
        }
        await request.post(url, {
                body: text,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'text/yaml'
                },
                timeout: OpenPAIBaseClient.TIMEOUT
            }
        );
    }

    /**
     * Submit a v1 job, will call /api/v1/user/{username}/jobs.
     * @param jobConfig The job config.
     */
    public async submitV1(userName: string, jobConfig: IJobConfigV1, token?: string): Promise<void> {
        const url = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/user/${userName}/jobs`);
        if(token === undefined) {
            token = await super.token();
        }
        return await request.post(url, {
                form: jobConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                json: true,
                timeout: OpenPAIBaseClient.TIMEOUT
            }
        );
    }

    /**
     * Get job SSH infomation, will call /api/v1/user/${userName}/jobs/${jobName}/ssh.
     * @param userName The user name.
     * @param jobName The job name.
     */
    // tslint:disable-next-line: unified-signatures
    public async getSshInfo(userName: string, jobName: string): Promise<IJobSshInfo>;

    /**
     * Get job SSH infomation, will call /api/v1/jobs/${jobName}/ssh.
     * @param jobName The job name.
     */
    public async getSshInfo(jobName: string): Promise<IJobSshInfo>;

    public async getSshInfo(param1: string, param2?: string): Promise<IJobSshInfo> {
        const userName = param2 ? param1 : undefined;
        const jobName = param2 ? param2 : param1;

        const url = userName ?
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/user/${userName}/jobs/${jobName}/ssh`) :
            Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs/${jobName}/ssh`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
}
