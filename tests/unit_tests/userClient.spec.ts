// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, IUser, UserClient } from '@api/v2';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';

import { testAllUsers } from '../common/test_data/testAllUsers';
import { testUserInfo } from '../common/test_data/testUserInfo';

/**
 * Unit tests for userClient.
 */
const testUri: string = 'openpai-js-sdk.test/rest-server';

const cluster: IPAICluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};

chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));

describe('Get user infomation', () => {
    const response: IUser = testUserInfo;
    const userName: string = 'core';
    before(() => {
        nock(`http://${testUri}`).get(`/api/v2/users/${userName}`).reply(200, response);
        nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
    });

    it('should return the user info', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.getUser(userName);
        expect(result).to.be.eql(response);
    });
});

describe('List all users', () => {
    const response: IUser[] = testAllUsers;
    before(() => nock(`http://${testUri}`).get('/api/v2/users/').reply(200, response));

    it('should return all users', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.getAllUser();
        expect(result).is.not.empty();
    });
});

describe('Create a new user', () => {
    const response: any = { message: 'User is created successfully' };
    before(() => nock(`http://${testUri}`).post('/api/v2/users/').reply(201, response));

    it('should create a new user', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.createUser({
            username: 'core11',
            password: '11111111',
            admin: false,
            virtualCluster: ['default']
        });
        expect(result).to.be.eql(response);
    });
});

describe('Delete a user', () => {
    const response: any = { message: 'user is removed successfully' };
    const userName: string = 'core11';
    before(() => nock(`http://${testUri}`).delete(`/api/v2/users/${userName}`).reply(200, response));

    it('should delete successfully', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.deleteUser(userName);
        expect(result).to.be.eql(response);
    });
});

describe('Update user group list', () => {
    const userName: string = 'core11';
    const newGroupList: string[] = ['newGroup1', 'newGroup2'];
    const response: any = { message: 'update user grouplist successfully.' };
    before(() => nock(`http://${testUri}`).put(`/api/v2/users/${userName}/grouplist`).reply(201, response));

    it('should update successfully', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.updateUserGrouplist(userName, newGroupList);
        expect(result).to.be.eql(response);
    });
});

describe('Add new group into user group list', () => {
    const userName: string = 'core11';
    const groupName: string = 'testGroup';
    let response: any;
    before(() => {
        response = { message: `User ${userName} is added into group ${groupName}` };
        nock(`http://${testUri}`).put(`/api/v2/users/${userName}/group`).reply(201, response);
    });

    it('should add successfully', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.updateUserGroup(userName, groupName);
        expect(result).to.be.eql(response);
    });
});

describe('Remove group from user group list', () => {
    const userName: string = 'core11';
    const groupName: string = 'testGroup';
    let response: any;
    before(() => {
        response = { message: `User ${userName} is removed from group ${groupName}` };
        nock(`http://${testUri}`).delete(`/api/v2/users/${userName}/group`).reply(201, response);
    });

    it('should remove successfully', async () => {
        const userClient: UserClient = new UserClient(cluster);
        const result: any = await userClient.deleteUserGroup(userName, groupName);
        expect(result).to.be.eql(response);
    });
});
