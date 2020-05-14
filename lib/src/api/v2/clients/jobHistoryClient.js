"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../commom/util");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Job client.
 */
class JobHistoryClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
    }
    /**
     * Check if job attempts is healthy.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getJobAttemptsHealthz(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts/healthz`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get all attempts of a job.
     * @param userName The user name.
     * @param jobName The job name.
     */
    async getJobAttempts(userName, jobName) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts`, this.cluster.https);
        return await this.httpClient.get(url);
    }
    /**
     * Get a specific attempt by attempt index.
     * @param userName The user name.
     * @param jobName The job name.
     * @param index The job attempt index.
     */
    async getJobAttempt(userName, jobName, index) {
        const url = util_1.Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/jobs/${userName}~${jobName}/job-attempts/${index}`, this.cluster.https);
        return await this.httpClient.get(url);
    }
}
exports.JobHistoryClient = JobHistoryClient;
