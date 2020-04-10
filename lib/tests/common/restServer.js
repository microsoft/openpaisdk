"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const nock = require("nock");
const testJobList_1 = require("../common/test_data/testJobList");
const testJobStatus_1 = require("../common/test_data/testJobStatus");
/**
 * Fake rest server.
 */
class RestServer {
    constructor() {
        this.cluster = {
            token: 'test-token',
            pai_uri: 'openpai-js-sdk.test',
            username: 'core'
        };
        this.testUri = `${this.cluster.pai_uri}/rest-server`;
        this.alias = this.cluster.alias || this.cluster.pai_uri || 'unknown';
        this.listJobs = () => nock(`http://${this.testUri}`).get('/api/v1/jobs').reply(200, testJobList_1.testJobList);
        this.listJobsQuery = () => nock(`http://${this.testUri}`).get('/api/v1/jobs?username=core').reply(200, testJobList_1.testJobList);
        this.queryJobStatus = () => nock(`http://${this.testUri}`).get(`/api/v2/jobs/${testJobStatus_1.testJobStatus.jobStatus.username}~${testJobStatus_1.testJobStatus.name}`).reply(200, testJobStatus_1.testJobStatus);
    }
}
exports.fakeRestSrv = new RestServer();
