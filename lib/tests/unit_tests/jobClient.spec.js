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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("../../src/api/v1");
const v2_1 = require("../../src/api/v2");
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const yaml = __importStar(require("js-yaml"));
const nock_1 = __importDefault(require("nock"));
const testJobConfig_1 = require("../common/test_data/testJobConfig");
const testJobList_1 = require("../common/test_data/testJobList");
const testJobStatus_1 = require("../common/test_data/testJobStatus");
/**
 * Unit tests for jobClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirty_chai_1.default);
beforeEach(() => nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('List jobs', () => {
    const response = testJobList_1.testJobList;
    before(() => nock_1.default(`http://${testUri}`).get('/api/v2/jobs').reply(200, response));
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.listJobs();
        chai_1.expect(result).is.not.empty();
    }).timeout(10000);
});
describe('List jobs with query', () => {
    const response = testJobList_1.testJobList;
    const queryString = 'username=core';
    before(() => nock_1.default(`http://${testUri}`).get(`/api/v2/jobs?${queryString}`).reply(200, response));
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.listJobs('core');
        chai_1.expect(result).is.not.empty();
    }).timeout(10000);
});
describe('Get job status', () => {
    const response = testJobStatus_1.testJobStatus;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock_1.default(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}`).reply(200, response));
    it('should return the job status', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.getJob(userName, jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get job config', () => {
    const response = testJobConfig_1.testJobConfig;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock_1.default(`http://${testUri}`)
        .get(`/api/v2/jobs/${userName}~${jobName}/config`)
        .reply(200, yaml.dump(testJobConfig_1.testJobConfig)));
    it('should return a job config', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.getJobConfig(userName, jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Submit a job', () => {
    const jobConfig = testJobConfig_1.testJobConfig;
    before(() => {
        nock_1.default(`http://${testUri}`).post('/api/v2/jobs').reply(202);
    });
    it('should submit a job without exception', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        await jobClient.createJob(jobConfig);
    });
});
describe('Submit a v1 job', () => {
    const jobConfigV1 = testJobConfig_1.testJobConfigV1;
    const response = {
        token: 'eyJhb...'
    };
    const userName = 'core';
    before(() => {
        nock_1.default(`http://${testUri}`).post('/api/v1/token').reply(200, response);
        nock_1.default(`http://${testUri}`).post(`/api/v1/user/${userName}/jobs`).reply(202);
    });
    it('should submit the job without exception', async () => {
        const jobClient = new v1_1.JobClient(cluster);
        await jobClient.submit(userName, jobConfigV1);
    });
});
describe('Start a job', () => {
    const response = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock_1.default(`http://${testUri}`).put(`/api/v2/jobs/${userName}~${jobName}/executionType`).reply(200, response));
    it('should start the job', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.updateJobExecutionType(userName, jobName, 'START');
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Stop a job', () => {
    const response = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock_1.default(`http://${testUri}`).put(`/api/v2/jobs/${userName}~${jobName}/executionType`).reply(200, response));
    it('should stop the job', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.updateJobExecutionType(userName, jobName, 'STOP');
        chai_1.expect(result).to.be.eql(response);
    });
});
