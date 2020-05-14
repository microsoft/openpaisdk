"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("./");
const baseClient_1 = require("./baseClient");
/**
 * OpenPAI Client.
 */
class OpenPAIClient extends baseClient_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
        this.job = new clients_1.JobClient(cluster);
        this.authn = new clients_1.AuthnClient(cluster);
    }
}
exports.OpenPAIClient = OpenPAIClient;
