"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const v2_1 = require("@pai/v2");
const yaml = require("js-yaml");
const request = require("request-promise-native");
/**
 * OpenPAI Job client.
 */
class JobClient extends v2_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * List jobs, will call /api/v1/jobs.
     * @param query The query string.
     */
    async list(query) {
        const url = query === undefined ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs?${query}`);
        return JSON.parse(await request.get(url));
    }
    /**
     * Get job status, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async get(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
    /**
     * Delete a job, will call /api/v2/user/{userName}/jobs/{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     * @param token Specific an access token (optional).
     */
    async delete(userName, jobName, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}`);
        if (token === undefined) {
            token = await super.token();
        }
        const res = await request.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: v2_1.OpenPAIBaseClient.TIMEOUT
        });
        return JSON.parse(res);
    }
    /**
     * Get job framework info, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getFrameworkInfo(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
    /**
     * Get job config, will call /api/v2/jobs/{userName}~{jobName}/config.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getConfig(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`);
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
    async execute(userName, jobName, type, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}/executionType`);
        if (token === undefined) {
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
            timeout: v2_1.OpenPAIBaseClient.TIMEOUT
        });
        return JSON.parse(res);
    }
    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    async submit(jobConfig, token) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`);
        const text = yaml.safeDump(jobConfig);
        if (token === undefined) {
            token = await super.token();
        }
        await request.post(url, {
            body: text,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/yaml'
            },
            timeout: v2_1.OpenPAIBaseClient.TIMEOUT
        });
    }
    async getSshInfo(param1, param2) {
        const userName = param2 ? param1 : undefined;
        const jobName = param2 ? param2 : param1;
        const url = userName ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/user/${userName}/jobs/${jobName}/ssh`) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs/${jobName}/ssh`);
        const res = await request.get(url);
        return JSON.parse(res);
    }
}
exports.JobClient = JobClient;
