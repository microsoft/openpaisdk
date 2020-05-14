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
chai.use(dirty_chai_1.default);
beforeEach(() => nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
describe('Get user infomation', () => {
    const response = testUserInfo_1.testUserInfo;
    const userName = 'core';
    before(() => {
        nock_1.default(`http://${testUri}`).get(`/api/v2/users/${userName}`).reply(200, response);
        nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' });
    });
    it('should return the user info', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.getUser(userName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('List all users', () => {
    const response = testAllUsers_1.testAllUsers;
    before(() => nock_1.default(`http://${testUri}`).get('/api/v2/users/').reply(200, response));
    it('should return all users', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.getAllUser();
        chai_1.expect(result).is.not.empty();
    });
});
describe('Create a new user', () => {
    const response = { message: 'User is created successfully' };
    before(() => nock_1.default(`http://${testUri}`).post('/api/v2/users/').reply(201, response));
    it('should create a new user', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.createUser({
            username: 'core11',
            password: '11111111',
            admin: false,
            virtualCluster: ['default']
        });
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Delete a user', () => {
    const response = { message: 'user is removed successfully' };
    const userName = 'core11';
    before(() => nock_1.default(`http://${testUri}`).delete(`/api/v2/users/${userName}`).reply(200, response));
    it('should delete successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.deleteUser(userName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Update user group list', () => {
    const userName = 'core11';
    const newGroupList = ['newGroup1', 'newGroup2'];
    const response = { message: 'update user grouplist successfully.' };
    before(() => nock_1.default(`http://${testUri}`).put(`/api/v2/users/${userName}/grouplist`).reply(201, response));
    it('should update successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateUserGrouplist(userName, newGroupList);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Add new group into user group list', () => {
    const userName = 'core11';
    const groupName = 'testGroup';
    let response;
    before(() => {
        response = { message: `User ${userName} is added into group ${groupName}` };
        nock_1.default(`http://${testUri}`).put(`/api/v2/users/${userName}/group`).reply(201, response);
    });
    it('should add successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.updateUserGroup(userName, groupName);
        chai_1.expect(result).to.be.eql(response);
    });
});
describe('Remove group from user group list', () => {
    const userName = 'core11';
    const groupName = 'testGroup';
    let response;
    before(() => {
        response = { message: `User ${userName} is removed from group ${groupName}` };
        nock_1.default(`http://${testUri}`).delete(`/api/v2/users/${userName}/group`).reply(201, response);
    });
    it('should remove successfully', async () => {
        const userClient = new v2_1.UserClient(cluster);
        const result = await userClient.deleteUserGroup(userName, groupName);
        chai_1.expect(result).to.be.eql(response);
    });
});
