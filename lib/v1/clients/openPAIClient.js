"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("@pai/v1/clients");
/**
 * OpenPAI Client.
 */
class OpenPAIClient extends clients_1.OpenPAIBaseClient {
    constructor(cluster) {
        super(cluster);
        this.job = new clients_1.JobClient(cluster);
        this.authn = new clients_1.AuthnClient(cluster);
    }
}
exports.OpenPAIClient = OpenPAIClient;
