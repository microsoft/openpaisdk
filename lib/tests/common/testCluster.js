"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clusters_json_1 = __importDefault(require("../../.tests/clusters.json"));
/**
 * Test cluster class, load test cluster info for e2e tests.
 */
class TestClusterClass {
    constructor(clusterAlias) {
        if (clusterAlias) {
            this.cluster = clusters_json_1.default
                .find(cluster => cluster.alias === clusterAlias);
        }
        else if (process.env.npm_config_cluster) {
            this.cluster = clusters_json_1.default
                .find(cluster => cluster.alias === process.env.npm_config_cluster);
        }
        else {
            this.cluster = clusters_json_1.default[0];
        }
    }
}
exports.TestCluster = new TestClusterClass();
