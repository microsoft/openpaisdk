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

import { IJobFrameworkInfo } from '../../../src/models/job';

export const testJobFrameworkInfo: IJobFrameworkInfo = {
    "summarizedFrameworkInfo": {
        "frameworkName": "core~tensorflow_serving_mnist_2019_6585ba19",
        "frameworkVersion": 10,
        "executionType": "START",
        "frameworkDescription": null,
        "userName": "core",
        "queue": "default",
        "totalGpuNumber": 1,
        "totalTaskNumber": 1,
        "totalTaskRoleNumber": 1,
        "firstRequestTimestamp": 1565329763372,
        "lastRequestTimestamp": 1565329763372,
        "frameworkState": "APPLICATION_RUNNING",
        "frameworkRetryPolicyState": {
            "retriedCount": 0,
            "succeededRetriedCount": 0,
            "transientNormalRetriedCount": 1,
            "transientConflictRetriedCount": 0,
            "nonTransientRetriedCount": 0,
            "unKnownRetriedCount": 0
        },
        "frameworkCompletedTimestamp": null,
        "applicationExitCode": null
    },
    "aggregatedFrameworkRequest": {
        "frameworkRequest": {
            "frameworkName": "core~tensorflow_serving_mnist_2019_6585ba19",
            "frameworkDescriptor": {
                "description": null,
                "version": 10,
                "executionType": "START",
                "retryPolicy": {
                    "fancyRetryPolicy": true,
                    "maxRetryCount": 0
                },
                "parentFramework": null,
                "user": {
                    "name": "core"
                },
                "taskRoles": {
                    "worker": {
                        "taskNumber": 1,
                        "scaleUnitNumber": 1,
                        "scaleUnitTimeoutSec": 0,
                        "taskRetryPolicy": {
                            "fancyRetryPolicy": false,
                            "maxRetryCount": 0
                        },
                        "applicationCompletionPolicy": {
                            "minFailedTaskCount": 1,
                            "minSucceededTaskCount": null
                        },
                        "taskService": {
                            "version": 0,
                            "entryPoint": "source YarnContainerScripts/worker.sh",
                            "sourceLocations": [
                                "/Container/core/core~tensorflow_serving_mnist_2019_6585ba19/YarnContainerScripts"
                            ],
                            "resource": {
                                "cpuNumber": 4,
                                "memoryMB": 8192,
                                "portDefinitions": {
                                    "ssh": {
                                        "start": 0,
                                        "count": 1
                                    },
                                    "http": {
                                        "start": 0,
                                        "count": 1
                                    },
                                    "model_server": {
                                        "start": 0,
                                        "count": 1
                                    }
                                },
                                "diskType": "HDD",
                                "diskMB": 0,
                                "gpuNumber": 1,
                                "gpuAttribute": 0
                            }
                        },
                        "platformSpecificParameters": {
                            "taskNodeLabel": null,
                            "taskNodeGpuType": null,
                            "samePortAllocation": false
                        }
                    }
                },
                "platformSpecificParameters": {
                    "amResource": {
                        "cpuNumber": 1,
                        "memoryMB": 1024,
                        "portDefinitions": {},
                        "diskType": "HDD",
                        "diskMB": 0,
                        "gpuNumber": 0,
                        "gpuAttribute": 0
                    },
                    "amNodeLabel": null,
                    "taskNodeLabel": null,
                    "taskNodeGpuType": null,
                    "queue": "default",
                    "containerConnectionMaxLostCount": -2,
                    "containerConnectionMaxExceedCount": 2,
                    "antiaffinityAllocation": false,
                    "gangAllocation": true,
                    "skipLocalTriedResource": true,
                    "amType": "DEFAULT",
                    "agentUseHeartbeat": false,
                    "agentHeartbeatIntervalSec": 30,
                    "agentExpiryIntervalSec": 180,
                    "agentUseHealthCheck": false,
                    "taskServiceHealthCheck": null
                }
            },
            "launchClientType": "UNKNOWN",
            "launchClientHostName": "172.17.0.2",
            "launchClientUserName": "UNKNOWN",
            "firstRequestTimestamp": 1565329763372,
            "lastRequestTimestamp": 1565329763372
        },
        "overrideApplicationProgressRequest": null,
        "migrateTaskRequests": {}
    },
    "aggregatedFrameworkStatus": {
        "frameworkStatus": {
            "frameworkName": "core~tensorflow_serving_mnist_2019_6585ba19",
            "frameworkVersion": 10,
            "frameworkState": "APPLICATION_RUNNING",
            "frameworkRetryPolicyState": {
                "retriedCount": 0,
                "succeededRetriedCount": 0,
                "transientNormalRetriedCount": 1,
                "transientConflictRetriedCount": 0,
                "nonTransientRetriedCount": 0,
                "unKnownRetriedCount": 0
            },
            "frameworkCreatedTimestamp": 1565329763372,
            "frameworkCompletedTimestamp": null,
            "applicationId": "application_1565337391589_0002",
            "applicationProgress": 0,
            "applicationTrackingUrl": "http://0.0.0.34:8088/proxy/application_1565337391589_0002/",
            "applicationLaunchedTimestamp": 1565337476313,
            "applicationCompletedTimestamp": null,
            "applicationExitCode": null,
            "applicationExitDescription": null,
            "applicationExitDiagnostics": null,
            "applicationExitType": null,
            "applicationExitTriggerMessage": null,
            "applicationExitTriggerTaskRoleName": null,
            "applicationExitTriggerTaskIndex": null
        },
        "aggregatedTaskRoleStatuses": {
            "worker": {
                "taskRoleStatus": {
                    "taskRoleName": "worker",
                    "taskRoleRolloutStatus": {
                        "overallRolloutServiceVersion": null,
                        "overallRolloutStatus": "UNKNOWN",
                        "overallRolloutStartTimestamp": null,
                        "overallRolloutEndTimestamp": null,
                        "currentRolloutScaleUnit": null,
                        "currentRolloutTaskIndexes": null,
                        "currentRolloutStatus": "UNKNOWN",
                        "currentRolloutStartTimestamp": null,
                        "currentRolloutEndTimestamp": null
                    },
                    "frameworkVersion": 10
                },
                "taskStatuses": {
                    "taskRoleName": "worker",
                    "taskStatusArray": [
                        {
                            "taskIndex": 0,
                            "taskRoleName": "worker",
                            "taskState": "CONTAINER_RUNNING",
                            "taskRetryPolicyState": {
                                "retriedCount": 0,
                                "succeededRetriedCount": 0,
                                "transientNormalRetriedCount": 0,
                                "transientConflictRetriedCount": 0,
                                "nonTransientRetriedCount": 0,
                                "unKnownRetriedCount": 0
                            },
                            "taskCreatedTimestamp": 1565337479036,
                            "taskCompletedTimestamp": null,
                            "taskServiceStatus": {
                                "serviceVersion": 0
                            },
                            "containerId": "container_e34_1565337391589_0002_01_000002",
                            "containerHost": "0.0.0.38",
                            "containerIp": "0.0.0.38",
                            "containerPorts": "ssh:34235;http:34236;model_server:34237;",
                            "containerGpus": 8,
                            "containerLogHttpAddress": "http://0.0.0.38:8042/node/containerlogs/container_e34_1565337391589_0002_01_000002/core/",
                            "containerConnectionLostCount": 0,
                            "containerIsDecommissioning": null,
                            "containerLaunchedTimestamp": 1565337482022,
                            "containerCompletedTimestamp": null,
                            "containerExitCode": null,
                            "containerExitDescription": null,
                            "containerExitDiagnostics": null,
                            "containerExitType": null
                        }
                    ],
                    "frameworkVersion": 10
                }
            }
        }
    }
};