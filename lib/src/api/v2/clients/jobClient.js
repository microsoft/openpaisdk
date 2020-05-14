"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../commom/util");
const yaml = __importStar(require("js-yaml"));
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Job client.
 */
class JobClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Submit a job in the system.
     * @param jobConfig The job config.
     */
    async createJob(jobConfig) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`, this.cluster.https);
        const text = yaml.safeDump(jobConfig);
        return await this.httpClient.post(url, text, undefined, {
            headers: {
                'content-type': 'text/yaml'
            }
        });
    }
    /**
     * Get the list of jobs.
     * @param username filter jobs with username.
     */
    async listJobs(username) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs`, this.cluster.https);
        return await this.httpClient.get(url, undefined, undefined, { username });
    }
    /**
     * Get job status.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getJob(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get job configuration.
     * This API always returns job config in v2 format (text/yaml).
     * Old job config in v1 format will be converted automatically.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getJobConfig(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/config`, this.cluster.https);
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
    async updateJobExecutionType(userName, jobName, type) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/executionType`, this.cluster.https);
        return await this.httpClient.put(url, { value: type });
    }
}
exports.JobClient = JobClient;
