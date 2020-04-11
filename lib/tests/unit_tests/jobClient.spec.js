"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("@api/v1");
const v2_1 = require("@api/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const yaml = require("js-yaml");
const nock = require("nock");
const testJobConfig_1 = require("../common/test_data/testJobConfig");
const testJobList_1 = require("../common/test_data/testJobList");
const testJobSshInfo_1 = require("../common/test_data/testJobSshInfo");
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
chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('List jobs', () => {
    const response = testJobList_1.testJobList;
    before(() => nock(`http://${testUri}`).get('/api/v2/jobs').reply(200, response));
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.list();
        chai_1.expect(result).is.not.empty();
    }).timeout(10000);
});
describe('List jobs with query', () => {
    const response = testJobList_1.testJobList;
    const queryString = 'username=core';
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs?${queryString}`).reply(200, response));
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.list(queryString);
        chai_1.expect(result).is.not.empty();
    }).timeout(10000);
});
describe('Get job status', () => {
    const response = testJobStatus_1.testJobStatus;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}`).reply(200, response));
    it('should return the job status', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.get(userName, jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get job config', () => {
    const response = testJobConfig_1.testJobConfig;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`)
        .get(`/api/v2/jobs/${userName}~${jobName}/config`)
        .reply(200, yaml.dump(testJobConfig_1.testJobConfig)));
    it('should return a job config', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.getConfig(userName, jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Submit a job', () => {
    const jobConfig = testJobConfig_1.testJobConfig;
    const response = {
        token: 'eyJhb...'
    };
    before(() => {
        nock(`http://${testUri}`).post('/api/v1/token').reply(200, response);
        nock(`http://${testUri}`).post('/api/v2/jobs').reply(202);
    });
    it('should submit a job without exception', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        await jobClient.submit(jobConfig);
    });
});
describe('Submit a v1 job', () => {
    const jobConfigV1 = testJobConfig_1.testJobConfigV1;
    const response = {
        token: 'eyJhb...'
    };
    const userName = 'core';
    before(() => {
        nock(`http://${testUri}`).post('/api/v1/token').reply(200, response);
        nock(`http://${testUri}`).post(`/api/v1/user/${userName}/jobs`).reply(202);
    });
    it('should submit the job without exception', async () => {
        const jobClient = new v1_1.JobClient(cluster);
        await jobClient.submit(userName, jobConfigV1);
    });
});
describe('Get job ssh information with user name and job name', () => {
    const response = testJobSshInfo_1.testJobSshInfo;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v1/user/${userName}/jobs/${jobName}/ssh`).reply(200, response));
    it('should return the job ssh info', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.getSshInfo(userName, jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get job ssh information with job name', () => {
    const response = testJobSshInfo_1.testJobSshInfo;
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v1/jobs/${jobName}/ssh`).reply(200, response));
    it('should return the job ssh info', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.getSshInfo(jobName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Start a job', () => {
    const response = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response));
    it('should start the job', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.execute(userName, jobName, 'START');
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Stop a job', () => {
    const response = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response));
    it('should stop the job', async () => {
        const jobClient = new v2_1.JobClient(cluster);
        const result = await jobClient.execute(userName, jobName, 'STOP');
        chai_1.expect(result).to.be.eql(response);
    });
});
