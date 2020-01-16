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

import { IVirtualCluster } from '../../../src/models/virtualCluster';

export const testAllVirtualClusters: { [id: string]: IVirtualCluster } = {
    "default": {
        "capacity": 26.481485,
        "maxCapacity": 100,
        "usedCapacity": 5.555556,
        "numActiveJobs": 3,
        "numJobs": 3,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 27648,
            "vCores": 15,
            "GPUs": 3
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 85.8000114,
            "memory": 740295.209472,
            "GPUs": 14.3000019
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "vc2": {
        "capacity": 22.962963,
        "maxCapacity": 22.962963,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 74.40000012,
            "memory": 641934.2232575999,
            "GPUs": 12.40000002
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "vc1": {
        "capacity": 17.222221,
        "maxCapacity": 17.222221,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 55.79999604,
            "memory": 481450.63249920008,
            "GPUs": 9.299999340000002
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "test11": {
        "capacity": 5.740741,
        "maxCapacity": 5.740741,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 18.60000084,
            "memory": 160483.5628032,
            "GPUs": 3.1000001399999999
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "test_vc_1": {
        "capacity": 100,
        "maxCapacity": 100,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": true,
        "resourcesTotal": {
            "vCores": 48,
            "memory": 417792,
            "GPUs": 8
        },
        "nodeList": [
            "0.0.0.30",
            "0.0.0.31"
        ]
    },
    "nni": {
        "capacity": 11.481482,
        "maxCapacity": 11.481482,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 37.20000168,
            "memory": 320967.1256064,
            "GPUs": 6.200000279999999
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "testvc": {
        "capacity": 5.3703694,
        "maxCapacity": 5.3703694,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 17.399996856,
            "memory": 150129.75065088,
            "GPUs": 2.8999994760000007
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "newtest": {
        "capacity": 0,
        "maxCapacity": 0,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 0,
            "memory": 0,
            "GPUs": 0
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "test_new": {
        "capacity": 0,
        "maxCapacity": 0,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 0,
            "memory": 0,
            "GPUs": 0
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    },
    "wertwer": {
        "capacity": 10.740738,
        "maxCapacity": 10.740738,
        "usedCapacity": 0,
        "numActiveJobs": 0,
        "numJobs": 0,
        "numPendingJobs": 0,
        "resourcesUsed": {
            "memory": 0,
            "vCores": 0,
            "GPUs": 0
        },
        "status": "RUNNING",
        "dedicated": false,
        "resourcesTotal": {
            "vCores": 34.79999112,
            "memory": 300259.4789376,
            "GPUs": 5.79999852
        },
        "nodeList": [
            "0.0.0.35",
            "0.0.0.26",
            "0.0.0.39",
            "0.0.0.42",
            "0.0.0.27",
            "0.0.0.36",
            "0.0.0.28",
            "0.0.0.33",
            "0.0.0.24",
            "0.0.0.29",
            "0.0.0.37",
            "0.0.0.41",
            "0.0.0.32",
            "0.0.0.38",
            "0.0.0.40"
        ]
    }
};