"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@api/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const nock = require("nock");
/**
 * Unit tests for storageClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    https: true,
    rest_server_uri: testUri,
    token: 'token'
};
chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('Get storage infomation by storage name', () => {
    const response = {
        data: {
            test: 'test'
        },
        extension: {},
        spn: 'test',
        type: 'azureblob'
    };
    const testName = 'testStorage';
    before(() => nock(`https://${testUri}`).get(`/api/v2/storage/server/${testName}`).reply(200, response));
    it('should return the storage info', async () => {
        const storageClient = new v2_1.StorageClient(cluster);
        const result = await storageClient.getServerByName(testName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get storage information list', () => {
    const response = [{
            data: {
                test: 'test'
            },
            extension: {},
            spn: 'test',
            type: 'azureblob'
        }];
    before(() => nock(`https://${testUri}`).get('/api/v2/storage/server').reply(200, response));
    it('should return the storage info', async () => {
        const storageClient = new v2_1.StorageClient(cluster);
        const result = await storageClient.getServer();
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get storage config by storage name', () => {
    const response = {
        name: 'PAI_SHARE',
        default: true,
        servers: [
            'PAI_SHARE_SERVER'
        ],
        mountInfos: [
            {
                mountPoint: '/data',
                path: 'data',
                server: 'PAI_SHARE_SERVER',
                permission: 'rw'
            },
            {
                mountPoint: '/home',
                path: 'users/\${PAI_USER_NAME}',
                server: 'PAI_SHARE_SERVER',
                permission: 'rw'
            }
        ]
    };
    const testName = 'testStorage';
    before(() => nock(`https://${testUri}`).get(`/api/v2/storage/config/${testName}`).reply(200, response));
    it('should return the storage info', async () => {
        const storageClient = new v2_1.StorageClient(cluster);
        const result = await storageClient.getConfigByName(testName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Get storage config list', () => {
    const response = [
        {
            name: 'PAI_SHARE',
            default: true,
            servers: [
                'PAI_SHARE_SERVER'
            ],
            mountInfos: [
                {
                    mountPoint: '/data',
                    path: 'data',
                    server: 'PAI_SHARE_SERVER',
                    permission: 'rw'
                },
                {
                    mountPoint: '/home',
                    path: 'users/\${PAI_USER_NAME}',
                    server: 'PAI_SHARE_SERVER',
                    permission: 'rw'
                }
            ]
        }
    ];
    before(() => nock(`https://${testUri}`).get('/api/v2/storage/config').reply(200, response));
    it('should return the storage info', async () => {
        const storageClient = new v2_1.StorageClient(cluster);
        const result = await storageClient.getConfig();
        chai_1.expect(result).to.be.eql(response);
    });
});
