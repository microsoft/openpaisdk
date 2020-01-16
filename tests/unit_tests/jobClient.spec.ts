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

import * as chai from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

import { expect } from 'chai';
import { JobClient } from '../../src/client/jobClient';
import { IPAICluster } from '../../src/models/cluster';
import { testJobConfig, testJobConfigV1 } from '../common/test_data/testJobConfig';
import { testJobFrameworkInfo } from '../common/test_data/testJobFrameworkInfo';
import { testJobList } from '../common/test_data/testJobList';
import { testJobSshInfo } from '../common/test_data/testJobSshInfo';
import { testJobStatus } from '../common/test_data/testJobStatus';

const testUri = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
const jobClient = new JobClient(cluster);

chai.use(dirtyChai);

describe('List jobs', () => {
    const response = testJobList;
    nock(`http://${testUri}`).get(`/api/v1/jobs`).reply(200, response);

    it('should return a list of jobs', async () => {
        const result = await jobClient.list();
        expect(result).is.not.empty();
    }).timeout(10000);
});

describe('List jobs with query', () => {
    const response = testJobList;
    const queryString = 'username=core';
    nock(`http://${testUri}`).get(`/api/v1/jobs?${queryString}`).reply(200, response);

    it('should return a list of jobs', async () => {
        const result = await jobClient.list(queryString);
        expect(result).is.not.empty();
    }).timeout(10000);
});

describe('Get job status', () => {
    const response = testJobStatus;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).get(`/api/v2/user/${userName}/jobs/${jobName}`).reply(200, response);

    it('should return the job status', async () => {
        const result = await jobClient.get(userName, jobName);
        expect(result).to.be.eql(response);
    });
})

describe('Get job framework information', () => {
    const response = testJobFrameworkInfo;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}`).reply(200, response);


    it('should return the job framework info', async () => {
        const result = await jobClient.getFrameworkInfo(userName, jobName);
        expect(result).to.be.eql(response);
    });
})

describe('Get job config', () => {
    const response = testJobConfig;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).get(`/api/v2/jobs/${userName}~${jobName}/config`).reply(200, response);

    it('should return a job config', async() => {
        const result = await jobClient.getConfig(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Submit a job', () => {
    const jobConfig = testJobConfig;
    const response = {
        token: 'eyJhb...'
    };
    nock(`http://${testUri}`).post(`/api/v1/token`).reply(200, response);
    nock(`http://${testUri}`).post(`/api/v2/jobs`).reply(202);

    it('should submit a job without exception', async() => {
        await jobClient.submit(jobConfig);
    })
});

describe('Submit a v1 job', () => {
    const jobConfigV1 = testJobConfigV1;
    const response = {
        token: 'eyJhb...'
    };
    const userName = 'core';
    nock(`http://${testUri}`).post(`/api/v1/token`).reply(200, response);
    nock(`http://${testUri}`).post(`/api/v1/user/${userName}/jobs`).reply(202);

    it('should submit the job without exception', async() => {
        await jobClient.submitV1(userName, jobConfigV1);
    })
});

describe('Get job ssh information with user name and job name', () => {
    const response = testJobSshInfo;
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).get(`/api/v1/user/${userName}/jobs/${jobName}/ssh`).reply(200, response);

    it('should return the job ssh info', async() => {
        const result = await jobClient.getSshInfo(userName, jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Get job ssh information with job name', () => {
    const response = testJobSshInfo;
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).get(`/api/v1/jobs/${jobName}/ssh`).reply(200, response);

    it('should return the job ssh info', async() => {
        const result = await jobClient.getSshInfo(jobName);
        expect(result).to.be.eql(response);
    });
});

describe('Start a job', () => {
    const response = {
        "message": "execute job tensorflow_serving_mnist_2019_6585ba19 successfully"
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response);

    it('should start the job', async() => {
        const result = await jobClient.execute(userName, jobName, 'START');
        expect(result).to.be.eql(response);
    })
});

describe('Stop a job', () => {
    const response = {
        "message": "execute job tensorflow_serving_mnist_2019_6585ba19 successfully"
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19';
    nock(`http://${testUri}`).put(`/api/v2/user/${userName}/jobs/${jobName}/executionType`).reply(200, response);

    it('should stop the job', async() => {
        const result = await jobClient.execute(userName, jobName, 'STOP');
        expect(result).to.be.eql(response);
    })
});

describe('Delete a job', () => {
    const response = {
        "message": "deleted job tensorflow_serving_mnist_2019_6585ba19_test successfully"
    };
    const userName = 'core';
    const jobName = 'tensorflow_serving_mnist_2019_6585ba19_test';
    nock(`http://${testUri}`).delete(`/api/v2/user/${userName}/jobs/${jobName}`).reply(201, response);

    it('should delete the job', async() => {
        const result = await jobClient.delete(userName, jobName);
        expect(result).to.be.eql(response);
    })
});