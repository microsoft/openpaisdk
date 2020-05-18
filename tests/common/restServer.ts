// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';
import nock from 'nock';

import { testJobList } from '../common/test_data/testJobList';
import { testJobStatus } from '../common/test_data/testJobStatus';

/**
 * Fake rest server.
 */
class RestServer {
    public cluster: IPAICluster = {
        token: 'test-token',
        pai_uri: 'openpai-js-sdk.test',
        username: 'core'
    };

    public testUri: string = `${this.cluster.pai_uri}/rest-server`;

    public alias: string = this.cluster.alias || this.cluster.pai_uri || 'unknown';

    public listJobs = () => nock(`http://${this.testUri}`).get('/api/v2/jobs').reply(200, testJobList);

    public listJobsQuery = () => nock(`http://${this.testUri}`).get('/api/v2/jobs?username=core').reply(200, testJobList);

    public queryJobStatus = () => nock(`http://${this.testUri}`).get(
        `/api/v2/jobs/${testJobStatus.jobStatus.username}~${testJobStatus.name}`
    ).reply(200, testJobStatus)
}

export const fakeRestSrv: RestServer = new RestServer();
