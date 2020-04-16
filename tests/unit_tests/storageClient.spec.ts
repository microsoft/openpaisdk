// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';
import * as chai from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

/**
 * Unit tests for storageClient.
 */
const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    https: true,
    rest_server_uri: testUri,
    token: 'token'
};

chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
