// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IVirtualCluster } from '@api/v2';

/**
 * Virtual clusters test data.
 */
export const testVirtualClusters: IVirtualCluster = {
    capacity: 26.481485,
    maxCapacity: 100,
    usedCapacity: 5.555556,
    numActiveJobs: 3,
    numJobs: 3,
    numPendingJobs: 0,
    resourcesUsed: {
        memory: 27648,
        vCores: 15,
        GPUs: 3
    },
    status: 'RUNNING',
    dedicated: false,
    resourcesTotal: {
        vCores: 85.8000114,
        memory: 740295.209472,
        GPUs: 14.3000019
    },
    nodeList: [
        '0.0.0.35',
        '0.0.0.26',
        '0.0.0.39',
        '0.0.0.42',
        '0.0.0.27',
        '0.0.0.36',
        '0.0.0.28',
        '0.0.0.33',
        '0.0.0.24',
        '0.0.0.29',
        '0.0.0.37',
        '0.0.0.41',
        '0.0.0.32',
        '0.0.0.38',
        '0.0.0.40'
    ]
};
