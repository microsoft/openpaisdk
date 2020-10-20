// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobStatus } from '@api/v2';

/**
 * Job status test data.
 */
export const testJobStatus: IJobStatus = {
    name: 'tensorflow_serving_mnist_2019_6585ba19',
    jobStatus: {
        username: 'core',
        state: 'RUNNING',
        subState: 'APPLICATION_RUNNING',
        executionType: 'START',
        retries: 1,
        retryDetails: {
            user: 0,
            platform: 1,
            resource: 0
        },
        createdTime: 1565329763372,
        completedTime: null,
        attemptId: 0,
        attemptState: 'RUNNING',
        appId: 'application_1565337391589_0002',
        appProgress: 0,
        appTrackingUrl: 'http://0.0.0.34/yarn/0.0.0.34:8088/proxy/application_1565337391589_0002/',
        appCreatedTime: 1565337476313,
        appLaunchedTime: 1565337476313,
        appCompletedTime: null,
        appExitCode: null,
        appExitSpec: null,
        appExitDiagnostics: null,
        appExitMessages: {
            container: null,
            runtime: null,
            launcher: null
        },
        appExitTriggerMessage: null,
        appExitTriggerTaskRoleName: null,
        appExitTriggerTaskIndex: null,
        appExitType: null,
        virtualCluster: 'default'
    },
    taskRoles: {
        worker: {
            taskRoleStatus: {
                name: 'worker'
            },
            taskStatuses: [
                {
                    taskIndex: 0,
                    taskUid: '65b2e476-1101-11eb-b396-96ba8c8049b4',
                    taskState: 'RUNNING',
                    retries: 0,
                    accountableRetries: 0,
                    createdTime: 1602998326000,
                    completedTime: null,
                    attemptId: 0,
                    attemptState: 'RUNNING',
                    containerId: 'container_e34_1565337391589_0002_01_000002',
                    containerIp: '0.0.0.38',
                    containerPorts: {
                        ssh: '34235',
                        http: '34236',
                        model_server: '34237'
                    },
                    containerGpus: 8,
                    containerLog: 'http://0.0.0.34/yarn/0.0.0.38:8042/node/containerlogs/container_e34_1565337391589_0002_01_000002/core/',
                    containerExitCode: null
                }
            ]
        }
    }
};
