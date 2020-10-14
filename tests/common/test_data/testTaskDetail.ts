// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ITaskDetail } from '@api/v2';

/**
 * Task status test data.
 */
export const testTaskDetail: ITaskDetail = {
    frameworkName: 'gusui~task_retry_histry_test',
    jobAttemptId: 0,
    taskRoleName: 'taskrole',
    taskIndex: 0,
    taskUid: '8056c39d-0dbb-11eb-b396-96ba8c8049b4',
    taskState: 'STOPPED',
    retries: 2,
    accountableRetries: 2,
    createdTime: 1602638452000,
    completedTime: 1602638498000,
    attempts: [
        {
            attemptId: 2,
            attemptState: 'STOPPED',
            currentAttemptLaunchedTime: 1602638478000,
            currentAttemptCompletedTime: 1602638498000,
            containerId: '46ac5c95-9c27-45ee-99ce-d94b395fa379',
            containerIp: '10.151.40.230',
            containerNodeName: 'node9',
            containerPorts: {
                ssh: '16497',
                http: '17664'
            },
            containerGpus: null,
            containerLog: '/log-manager/10.151.40.230:9103/tail/gusui/0964880e236bb3bcca08be4d47a98447/taskrole/46ac5c95-9c27-45ee-99ce-d94b395fa379/',
            containerExitCode: -220,
            containerExitSpec: {
                code: -220,
                phrase: 'FrameworkAttemptCompletion',
                issuer: 'PAI_FC',
                causer: 'USER_STOP',
                type: 'USER_STOP',
                stage: 'UNKNOWN',
                behavior: 'PERMANENT',
                reaction: 'NEVER_RETRY',
                reason: 'Stop to complete current job attempt',
                repro: [
                    'Stop a job with long running container'
                ]
            },
            containerExitDiagnostics: 'Stop to complete current FrameworkAttempt',
            hived: {
                affinityGroupName: 'default/0964880e236bb3bcca08be4d47a98447-taskrole-0',
                lazyPreempted: null,
                lazyPreemptionStatus: null
            }
        },
        {
            attemptId: 0,
            attemptState: 'STOPPED',
            currentAttemptLaunchedTime: 1602638452000,
            currentAttemptCompletedTime: 1602638463000,
            containerId: '086882e4-12a5-40fe-9dc8-22d144f44f47',
            containerIp: '10.151.40.230',
            containerNodeName: 'node9',
            containerPorts: {
                ssh: '16497',
                http: '17664'
            },
            containerGpus: null,
            containerLog: '/log-manager/10.151.40.230:9103/tail/gusui/0964880e236bb3bcca08be4d47a98447/taskrole/086882e4-12a5-40fe-9dc8-22d144f44f47/',
            containerExitCode: -220,
            containerExitSpec: {
                code: -220,
                phrase: 'FrameworkAttemptCompletion',
                issuer: 'PAI_FC',
                causer: 'USER_STOP',
                type: 'USER_STOP',
                stage: 'UNKNOWN',
                behavior: 'PERMANENT',
                reaction: 'NEVER_RETRY',
                reason: 'Stop to complete current job attempt',
                repro: [
                    'Stop a job with long running container'
                ]
            },
            containerExitDiagnostics: 'Stop to complete current FrameworkAttempt',
            hived: {
                affinityGroupName: 'default/0964880e236bb3bcca08be4d47a98447-taskrole-0',
                lazyPreempted: null,
                lazyPreemptionStatus: null
            }
        },
        {
            attemptId: 1,
            attemptState: 'STOPPED',
            currentAttemptLaunchedTime: 1602638463000,
            currentAttemptCompletedTime: 1602638478000,
            containerId: '1a4d0a52-4723-4088-98d2-ad29eaac3da4',
            containerIp: '10.151.40.230',
            containerNodeName: 'node9',
            containerPorts: {
                ssh: '16497',
                http: '17664'
            },
            containerGpus: null,
            containerLog: '/log-manager/10.151.40.230:9103/tail/gusui/0964880e236bb3bcca08be4d47a98447/taskrole/1a4d0a52-4723-4088-98d2-ad29eaac3da4/',
            containerExitCode: -220,
            containerExitSpec: {
                code: -220,
                phrase: 'FrameworkAttemptCompletion',
                issuer: 'PAI_FC',
                causer: 'USER_STOP',
                type: 'USER_STOP',
                stage: 'UNKNOWN',
                behavior: 'PERMANENT',
                reaction: 'NEVER_RETRY',
                reason: 'Stop to complete current job attempt',
                repro: [
                    'Stop a job with long running container'
                ]
            },
            containerExitDiagnostics: 'Stop to complete current FrameworkAttempt',
            hived: {
                affinityGroupName: 'default/0964880e236bb3bcca08be4d47a98447-taskrole-0',
                lazyPreempted: null,
                lazyPreemptionStatus: null
            }
        }
    ]
};
