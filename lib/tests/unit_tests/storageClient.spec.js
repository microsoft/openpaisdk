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
const chai = __importStar(require("chai"));
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const nock_1 = __importDefault(require("nock"));
/**
 * Unit tests for storageClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
const cluster = {
    https: true,
    rest_server_uri: testUri,
    token: 'token'
};
chai.use(dirty_chai_1.default);
beforeEach(() => nock_1.default(`http://${testUri}`).post('/api/v2/authn/basic/login').reply(200, { token: 'token' }));
