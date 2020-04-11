"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@api/v2");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const nock = require("nock");
const testAllUsers_1 = require("../common/test_data/testAllUsers");
const testUserInfo_1 = require("../common/test_data/testUserInfo");
/**
 * Unit tests for userClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    password: 'test',
    rest_server_uri: testUri,
    username: 'test'
};
chai.use(dirtyChai);
beforeEach(() => nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('Get user infomation', () => {
    const response = testUserInfo_1.testUserInfo;
    const userName = 'core';
    before(() => {
        nock(`http://${testUri}`).get(`/api/v2/user/${userName}`).reply(200, response);
        nock(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
    });
    it('should return the user info', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.get(userName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('List all users', () => {
    const response = testAllUsers_1.testAllUsers;
    before(() => nock(`http://${testUri}`).get('/api/v2/user/').reply(200, response));
    it('should return all users', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.list();
        chai_1.expect(result).is.not.empty();
    });
});
describe('Create a new user', () => {
    const response = { message: 'User is created successfully' };
    before(() => nock(`http://${testUri}`).post('/api/v2/user/').reply(201, response));
    it('should create a new user', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.create('core11', '11111111', false, '', ['default']);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user extension data', () => {
    const response = { message: 'Update user extension data successfully.' };
    const userName = 'core11';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/extension`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateExtension(userName, { ex1: 'ex2' });
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Delete a user', () => {
    const response = { message: 'user is removed successfully' };
    const userName = 'core11';
    before(() => nock(`http://${testUri}`).delete(`/api/v2/user/${userName}`).reply(200, response));
    it('should delete successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.delete(userName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user virtualCluster data', () => {
    const response = { message: 'Update user virtualCluster data successfully.' };
    const userName = 'core11';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/virtualcluster`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateVirtualcluster(userName, ['default']);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user password', () => {
    const response = { message: 'update user password successfully.' };
    const userName = 'core11';
    const newPassword = 'newPassword';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/password`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updatePassword(userName, undefined, newPassword);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user email', () => {
    const response = { message: 'Update user email data successfully.' };
    const userName = 'core11';
    const newEmail = 'new@email.test';
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/email`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateEmail(userName, newEmail);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user admin permission', () => {
    const response = { message: 'Update user admin permission successfully.' };
    const userName = 'core11';
    const newAdminPermission = false;
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/admin`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateAdminPermission(userName, newAdminPermission);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user group list', () => {
    const userName = 'core11';
    const newGroupList = ['newGroup1', 'newGroup2'];
    const response = { message: 'update user grouplist successfully.' };
    before(() => nock(`http://${testUri}`).put(`/api/v2/user/${userName}/grouplist`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateGroupList(userName, newGroupList);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Add new group into user group list', () => {
    const userName = 'core11';
    const groupName = 'testGroup';
    let response;
    before(() => {
        response = { message: `User ${userName} is added into group ${groupName}` };
        nock(`http://${testUri}`).put(`/api/v2/user/${userName}/group`).reply(201, response);
    });
    it('should add successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.addGroup(userName, groupName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Remove group from user group list', () => {
    const userName = 'core11';
    const groupName = 'testGroup';
    let response;
    before(() => {
        response = { message: `User ${userName} is removed from group ${groupName}` };
        nock(`http://${testUri}`).delete(`/api/v2/user/${userName}/group`).reply(201, response);
    });
    it('should remove successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.removeGroup(userName, groupName);
        chai_1.expect(result).to.be.eql(response);
    });
});
