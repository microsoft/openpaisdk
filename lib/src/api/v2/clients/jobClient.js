"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@pai/commom/util");
const yaml = require("js-yaml");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Job client.
 */
class JobClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * List jobs, will call /api/v2/jobs.
     * @param query The query string.
     */
    async list(user) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`, this.cluster.https);
        return await this.httpClient.get(url, undefined, undefined, { username: user });
    }
    /**
     * Get job detail, will call /api/v2/jobs/{userName}~{jobName}.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async get(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get job config, will call /api/v2/jobs/{userName}~{jobName}/config.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getConfig(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`, this.cluster.https);
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
    async execute(userName, jobName, type) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/user/${userName}/jobs/${jobName}/executionType`, this.cluster.https);
        return await this.httpClient.put(url, JSON.stringify({ value: type }));
    }
    /**
     * Submit a job, will call /api/v2/jobs.
     * @param jobConfig The job config.
     */
    async submit(jobConfig) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`, this.cluster.https);
        const text = yaml.safeDump(jobConfig);
        await this.httpClient.post(url, text, undefined, {
            headers: {
                'Content-Type': 'text/yaml'
            }
        });
    }
    async getSshInfo(param1, param2) {
        const userName = param2 ? param1 : undefined;
        const jobName = param2 ? param2 : param1;
        const url = userName ?
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/user/${userName}/jobs/${jobName}/ssh`, this.cluster.https) :
            util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v1/jobs/${jobName}/ssh`, this.cluster.https);
        return this.httpClient.get(url);
    }
}
exports.JobClient = JobClient;
