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

// tslint:disable-next-line:missing-jsdoc
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

import { IJobConfig, IJobFrameworkInfo } from '../../lib';
import { IJobConfigV1, IJobSshInfo } from '../../lib/models/job';
import { IJobInfo, IJobStatus, IPAICluster, JobClient } from '../../src';
import { testJobConfig, testJobConfigV1 } from '../common/test_data/testJobConfig';
import { testJobFrameworkInfo } from '../common/test_data/testJobFrameworkInfo';
import { testJobList } from '../common/test_data/testJobList';
import { testJobSshInfo } from '../common/test_data/testJobSshInfo';
import { testJobStatus } from '../common/test_data/testJobStatus';

const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v1/authn/basic/login').reply(200, { token: 'token' }));

describe('List jobs', () => {
    const response: IJobInfo[] = testJobList;
    before(() => nock(`http://${testUri}`).get('/api/v1/jobs').reply(200, response));

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: IJobInfo[] = await jobClient.list();
        expect(result).is.not.empty();
    }).timeout(10000);
});

describe('List jobs with query', () => {
    const response: IJobInfo[] = testJobList;
    const queryString: string = 'username=core';
    before(() => nock(`http://${testUri}`).get(`/api/v1/jobs?${queryString}`).reply(200, response));

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list of jobs', async () => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: IJobInfo[] = await jobClient.list(queryString);
        expect(result).is.not.empty();
    }).timeout(10000);
});

describe('Get job status', () => {
    const response: IJobStatus = testJobStatus;
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v2/user/${userName}/jobs/${jobName}`).reply(200, response));

    it('should return the job status', async () => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.get(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Get job framework information', () => {
    const response: IJobFrameworkInfo = testJobFrameworkInfo;
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}`).reply(200, response));

    it('should return the job framework info', async () => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.getFrameworkInfo(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Get job config', () => {
    const response: IJobConfig = testJobConfig;
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}/config`).reply(200, response));

    it('should return a job config', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.getConfig(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Submit a job', () => {
    const jobConfig: IJobConfig = testJobConfig;
    const response: any = {
        token: 'eyJhb...'
    };
    before(() => {
        nock(`http://${testUri}`).post('/api/v1/token').reply(200, response);
        nock(`http://${testUri}`).post('/api/v2/jobs').reply(202);
    });

    it('should submit a job without exception', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        await jobClient.submit(jobConfig);
    });
});

describe('Submit a v1 job', () => {
    const jobConfigV1: IJobConfigV1 = testJobConfigV1;
    const response: any = {
        token: 'eyJhb...'
    };
    const userName: string = 'core';
    before(() => {
        nock(`http://${testUri}`).post('/api/v1/token').reply(200, response);
        nock(`http://${testUri}`).post(`/api/v1/user/${userName}/jobs`).reply(202);
    });

    it('should submit the job without exception', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        await jobClient.submitV1(userName, jobConfigV1);
    });
});

describe('Get job ssh information with user name and job name', () => {
    const response: IJobSshInfo = testJobSshInfo;
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v1/user/${userName}/jobs/${jobName}/ssh`).reply(200, response));

    it('should return the job ssh info', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.getSshInfo(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Get job ssh information with job name', () => {
    const response: IJobSshInfo = testJobSshInfo;
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).get(`/api/v1/jobs/${jobName}/ssh`).reply(200, response));

    it('should return the job ssh info', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.getSshInfo(jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Start a job', () => {
    const response: any = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response));

    it('should start the job', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.execute(userName, jobName, 'START');
        expect(result).to.be.eql(response);
    });
});

describe('Stop a job', () => {
    const response: any = {
        message: 'execute job tensorflow_serving_mnist_2019_6585ba19 successfully'
    };
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response));

    it('should stop the job', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.execute(userName, jobName, 'STOP');
        expect(result).to.be.eql(response);
    });
});

describe('Delete a job', () => {
    const response: any = {
        message: 'deleted job tensorflow_serving_mnist_2019_6585ba19_test successfully'
    };
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19_test';
    before(() => nock(`http://${testUri}`).delete(`/api/v2/user/${userName}/jobs/${jobName}`).reply(201, response));

    it('should delete the job', async() => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.delete(userName, jobName);
        expect(result).to.be.eql(response);
    });
});
