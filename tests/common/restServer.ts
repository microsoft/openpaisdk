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

import { testJobConfig, testJobConfigV1 } from '../common/test_data/testJobConfig';
import { testJobFrameworkInfo } from '../common/test_data/testJobFrameworkInfo';
import { testJobList } from '../common/test_data/testJobList';
import { testJobSshInfo } from '../common/test_data/testJobSshInfo';
import { testJobStatus } from '../common/test_data/testJobStatus';

import { IJobInfo, IJobStatus, IPAICluster } from '../../src';
import * as nock from 'nock';

class RestServer {
    public cluster: IPAICluster = {
        token: 'test-token',
        pai_uri: 'openpai-js-sdk.test',
        username: 'core'
    };

    public testUri: string = `${this.cluster.pai_uri}/rest-server`;

    public alias: string = this.cluster.alias || this.cluster.pai_uri || "unknown";

    public listJobs = () => nock(`http://${this.testUri}`).get('/api/v1/jobs').reply(200, testJobList);

    public listJobsQuery = () => nock(`http://${this.testUri}`).get(`/api/v1/jobs?username=core`).reply(200, testJobList);

    public queryJobStatus = () => nock(`http://${this.testUri}`).get(
        `/api/v2/jobs/${testJobStatus.jobStatus.username}~${testJobStatus.name}`
    ).reply(200, testJobStatus);
}

export const fakeRestSrv = new RestServer();