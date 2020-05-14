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
const v2_1 = require("../../src/api/v2");
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const nock_1 = __importDefault(require("nock"));
const testAllVirtualClusters_1 = require("../common/test_data/testAllVirtualClusters");
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
chai.use(dirty_chai_1.default);
beforeEach(() => nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('List all virtual clusters', () => {
    const response = testAllVirtualClusters_1.testAllVirtualClusters;
    before(() => {
        nock_1.default(`http://${testUri}`).get('/api/v2/virtual-clusters').reply(200, response);
        nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
    });
    it('should return all virtual clusters', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.listVirtualClusters();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get a virtual cluster', () => {
    const response = testVirtualCluster_1.testVirtualClusters;
    const vcName = 'default';
    before(() => nock_1.default(`http://${testUri}`).get(`/api/v2/virtual-clusters/${vcName}`).reply(200, response));
    it('should return the virtual cluster info', async () => {
        const virtualClusterClient = new v2_1.VirtualClusterClient(cluster);
        const result = await virtualClusterClient.getVirtualCluster(vcName);
        chai_1.expect(result).to.be.eql(response);
    });
});
