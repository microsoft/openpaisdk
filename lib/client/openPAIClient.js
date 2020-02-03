"use strict";
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const baseClient_1 = require("./baseClient");
const jobClient_1 = require("./jobClient");
const storageClient_1 = require("./storageClient");
const userClient_1 = require("./userClient");
const virtualClusterClient_1 = require("./virtualClusterClient");
/**
 * OpenPAI Client.
 */
class OpenPAIClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
        this.job = new jobClient_1.JobClient(cluster);
        this.user = new userClient_1.UserClient(cluster);
        this.virtualCluster = new virtualClusterClient_1.VirtualClusterClient(cluster);
        this.authn = new __1.AuthnClient(cluster);
        this.storage = new storageClient_1.StorageClient(cluster);
    }
}
exports.OpenPAIClient = OpenPAIClient;
