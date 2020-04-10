"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@pai/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const nock = require("nock");
const testAllVirtualClusters_1 = require("../common/test_data/testAllVirtualClusters");
const testNodeResources_1 = require("../common/test_data/testNodeResources");
const testVirtualCluster_1 = require("../common/test_data/testVirtualCluster");
/**
 * Unit tests for virtualClusterClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v1/authn/basic/login').reply(200, { token: 'token' }));
describe('List all virtual clusters', () => {
    const response = testAllVirtualClusters_1.testAllVirtualClusters;
    before(() => {
        nock(`http://${testUri}`).get('/api/v2/virtual-clusters').reply(200, response);
        nock(`http://${testUri}`).post('/api/v1/authn/basic/login').reply(200, { token: 'token' });
    });
    it('should return all virtual clusters', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.list();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get a virtual cluster', () => {
    const response = testVirtualCluster_1.testVirtualClusters;
    const vcName = 'default';
    before(() => nock(`http://${testUri}`).get(`/api/v2/virtual-clusters/${vcName}`).reply(200, response));
    it('should return the virtual cluster info', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.get(vcName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get virtual cluster node resources', () => {
    const response = testNodeResources_1.testNodeResources;
    before(() => nock(`http://${testUri}`).get('/api/v2/virtual-clusters/nodeResource').reply(200, response));
    it('should return the virtual cluster info', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.getNodeResource();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Create a new virtual cluster', () => {
    const vcName = 'testNewVc1';
    const vcCapacity = 1;
    let response;
    before(() => {
        response = { message: `create vc: ${vcName} to capacity: ${vcCapacity} successfully.` };
        nock(`http://${testUri}`).put(`/api/v1/virtual-clusters/${vcName}`).reply(201, response);
    });
    it('should return the virtual cluster info', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.createOrUpdate(vcName, vcCapacity, vcCapacity);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Remove a virtual cluster', () => {
    const vcName = 'testNewVc1';
    let response;
    before(() => {
        response = { message: `Remove vc: ${vcName} successfully` };
        nock(`http://${testUri}`).delete(`/api/v1/virtual-clusters/${vcName}`).reply(201, response);
    });
    it('should remove successfully', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.delete(vcName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Change virtual cluster status', () => {
    const vcName = 'testNewVc1';
    const vcStatus = 'stopped';
    let response;
    before(() => {
        response = { message: `stop vc ${vcName} successfully` };
        nock(`http://${testUri}`).put(`/api/v1/virtual-clusters/${vcName}/status`).reply(201, response);
    });
    it('should remove successfully', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.changeStatus(vcName, vcStatus);
        chai_1.expect(result).to.be.eql(response);
    });
});
