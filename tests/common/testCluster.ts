// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '@api/v2';

import clustersJson from '../../.tests/clusters.json';

/**
 * Test cluster class, load test cluster info for e2e tests.
 */
class TestClusterClass {
    public readonly cluster: IPAICluster;

    constructor(clusterAlias?: string) {
        if (clusterAlias) {
            this.cluster = clustersJson
                .find(cluster => cluster.alias === clusterAlias)!;
        } else if (process.env.npm_config_cluster) {
            this.cluster = clustersJson
                .find(cluster => cluster.alias === process.env.npm_config_cluster)!;
        } else {
            this.cluster = clustersJson[0]!;
        }
    }
}

export const TestCluster: TestClusterClass = new TestClusterClass();
