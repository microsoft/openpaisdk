// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobConfig as IJobConfigV1, JobClient as JobClientV1 } from '@pai/v1';
import {
    IJobConfig, IJobInfo, IJobSshInfo, IJobStatus, IPAICluster, JobClient
} from '@pai/v2';
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as yaml from 'js-yaml';
import * as nock from 'nock';

import { testJobConfig, testJobConfigV1 } from '../common/test_data/testJobConfig';
import { testJobList } from '../common/test_data/testJobList';
import { testJobSshInfo } from '../common/test_data/testJobSshInfo';
import { testJobStatus } from '../common/test_data/testJobStatus';

/**
 * Unit tests for jobClient.
 */
const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));

describe('List jobs', () => {
    const response: IJobInfo[] = testJobList;
    before(() => nock(`http://${testUri}`).get('/api/v2/jobs').reply(200, response));

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
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs?${queryString}`).reply(200, response));

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
    before(() => nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}`).reply(200, response));

    it('should return the job status', async () => {
        const jobClient: JobClient = new JobClient(cluster);
        const result: any = await jobClient.get(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Get job config', () => {
    const response: IJobConfig = testJobConfig;
    const userName: string = 'core';
    const jobName: string = 'tensorflow_serving_mnist_2019_6585ba19';
    before(() => nock(`http://${testUri}`)
        .get(`/api/v2/jobs/${userName}~${jobName}/config`)
        .reply(200, yaml.dump(testJobConfig))
    );

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
        const jobClient: JobClientV1 = new JobClientV1(cluster);
        await jobClient.submit(userName, jobConfigV1);
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
