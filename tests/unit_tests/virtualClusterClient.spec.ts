// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, VirtualClusterClient } from '@api/v2';
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as nock from 'nock';

import { testAllVirtualClusters } from '../common/test_data/testAllVirtualClusters';
import { testNodeResources } from '../common/test_data/testNodeResources';
import { testVirtualClusters } from '../common/test_data/testVirtualCluster';

/**
 * Unit tests for virtualClusterClient.
 */
const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));

describe('List all virtual clusters', () => {
    const response: any = testAllVirtualClusters;
    before(() => {
        nock(`http://${testUri}`).get('/api/v2/virtual-clusters').reply(200, response);
        nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
    });

    it('should return all virtual clusters', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.list();
        expect(result).to.be.eql(response);
    });
});

describe('Get a virtual cluster', () => {
    const response: any = testVirtualClusters;
    const vcName: string = 'default';
    before(() => nock(`http://${testUri}`).get(`/api/v2/virtual-clusters/${vcName}`).reply(200, response));

    it('should return the virtual cluster info', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.get(vcName);
        expect(result).to.be.eql(response);
    });
});

describe('Get virtual cluster node resources', () => {
    const response: any = testNodeResources;
    before(() => nock(`http://${testUri}`).get('/api/v2/virtual-clusters/nodeResource').reply(200, response));

    it('should return the virtual cluster info', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.getNodeResource();
        expect(result).to.be.eql(response);
    });
});

describe('Create a new virtual cluster', () => {
    const vcName: string = 'testNewVc1';
    const vcCapacity: number = 1;
    let response: any;
    before(() => {
        response = { message: `create vc: ${vcName} to capacity: ${vcCapacity} successfully.` };
        nock(`http://${testUri}`).put(`/api/v1/virtual-clusters/${vcName}`).reply(201, response);
    });

    it('should return the virtual cluster info', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.createOrUpdate(vcName, vcCapacity, vcCapacity);
        expect(result).to.be.eql(response);
    });
});

describe('Remove a virtual cluster', () => {
    const vcName: string = 'testNewVc1';
    let response: any;
    before(() => {
        response = { message: `Remove vc: ${vcName} successfully` };
        nock(`http://${testUri}`).delete(`/api/v1/virtual-clusters/${vcName}`).reply(201, response);
    });

    it('should remove successfully', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.delete(vcName);
        expect(result).to.be.eql(response);
    });
});

describe('Change virtual cluster status', () => {
    const vcName: string = 'testNewVc1';
    const vcStatus: 'stopped' | 'running' = 'stopped';
    let response: any;
    before(() => {
        response = { message: `stop vc ${vcName} successfully` };
        nock(`http://${testUri}`).put(`/api/v1/virtual-clusters/${vcName}/status`).reply(201, response);
    });

    it('should remove successfully', async () => {
        const virtualClusterClient: VirtualClusterClient = new VirtualClusterClient(cluster);
        const result: any = await virtualClusterClient.changeStatus(vcName, vcStatus);
        expect(result).to.be.eql(response);
    });
});
