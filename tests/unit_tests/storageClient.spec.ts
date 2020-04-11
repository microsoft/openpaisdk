// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IStorageConfig, IStorageServer, StorageClient } from '@api/v2';
import * as chai from 'chai';
import { expect } from 'chai';
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

describe('Get storage infomation by storage name', () => {
    const response: IStorageServer = {
        data: {
            test: 'test'
        },
        extension: {},
        spn: 'test',
        type: 'azureblob'
    };
    const testName: string = 'testStorage';
    before(() => nock(`https://${testUri}`).get(`/api/v2/storage/server/${testName}`).reply(200, response));

    it('should return the storage info', async () => {
        const storageClient: StorageClient = new StorageClient(cluster);
        const result: any = await storageClient.getServerByName(testName);
        expect(result).to.be.eql(response);
    });
});

describe('Get storage information list', () => {
    const response: IStorageServer[] = [{
        data: {
            test: 'test'
        },
        extension: {},
        spn: 'test',
        type: 'azureblob'
    }];
    before(() => nock(`https://${testUri}`).get('/api/v2/storage/server').reply(200, response));

    it('should return the storage info', async () => {
        const storageClient: StorageClient = new StorageClient(cluster);
        const result: any = await storageClient.getServer();
        expect(result).to.be.eql(response);
    });
});

describe('Get storage config by storage name', () => {
    const response: IStorageConfig = {
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
    const testName: string = 'testStorage';
    before(() => nock(`https://${testUri}`).get(`/api/v2/storage/config/${testName}`).reply(200, response));

    it('should return the storage info', async () => {
        const storageClient: StorageClient = new StorageClient(cluster);
        const result: any = await storageClient.getConfigByName(testName);
        expect(result).to.be.eql(response);
    });
});

describe('Get storage config list', () => {
    const response: IStorageConfig[] = [
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
        const storageClient: StorageClient = new StorageClient(cluster);
        const result: any = await storageClient.getConfig();
        expect(result).to.be.eql(response);
    });
});
