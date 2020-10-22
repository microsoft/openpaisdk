// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ITaskDetail } from '@api/v2';

/**
 * Task status test data.
 */
export const testTaskDetail: ITaskDetail = {
    username: 'test_user',
    jobName: 'retry_history_test_2020',
    jobAttemptId: 0,
    taskRoleName: 'taskrole',
    taskIndex: 0,
    taskUid: '7ca69d5d-0dfb-11eb-b396-96ba8c8049b4',
    taskState: 'STOPPED',
    retries: 1,
    accountableRetries: 1,
    createdTime: 1602665934000,
    completedTime: 1602665969000,
    attempts: [
       {
           attemptId: 1,
           attemptState: 'STOPPED',
           currentAttemptCreatedTime: 1602665952000,
           currentAttemptLaunchedTime: 1602665952000,
           currentAttemptCompletedTime: 1602665969000,
           containerId: 'b62b9972-ee99-405d-a1bc-9f4467b7289a',
           containerIp: '10.151.40.230',
           containerNodeName: 'node9',
           containerPorts: {
           ssh: '26303',
           http: '22539'
           },
           containerGpus: null,
           containerLog: '/log-manager/10.151.40.230:9103/tail/gusui/ececd1f96237e45afd819f2cf668da9c/taskrole/b62b9972-ee99-405d-a1bc-9f4467b7289a/',
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
              affinityGroupName: 'default/ececd1f96237e45afd819f2cf668da9c-taskrole-0',
              lazyPreempted: null,
              lazyPreemptionStatus: null
           }
       },
       {
           attemptId: 0,
           attemptState: 'STOPPED',
           currentAttemptCreatedTime: 1602665934000,
           currentAttemptLaunchedTime: 1602665934000,
           currentAttemptCompletedTime: 1602665952000,
           containerId: '142b5212-1f2b-4ad6-83da-17d7d1e99e4f',
           containerIp: '10.151.40.230',
           containerNodeName: 'node9',
           containerPorts: {
              ssh: '26303',
              http: '22539'
           },
           containerGpus: null,
           containerLog: '/log-manager/10.151.40.230:9103/tail/gusui/ececd1f96237e45afd819f2cf668da9c/taskrole/142b5212-1f2b-4ad6-83da-17d7d1e99e4f/',
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
              affinityGroupName: 'default/ececd1f96237e45afd819f2cf668da9c-taskrole-0',
              lazyPreempted: null,
              lazyPreemptionStatus: null
           }
       }
    ]
};
