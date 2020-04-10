// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobInfo } from '@pai/v2';

/**
 * Job list test data.
 */
export const testJobList: IJobInfo[] = [{
    appExitCode: 0,
    completedTime: 1563499887777,
    createdTime: 1563499625106,
    executionType: 'STOP',
    name: 'sklearn-mnist',
    retries: 0,
    retryDetails: {
        platform: 0,
        resource: 0,
        user: 0
    },
    state: 'SUCCEEDED',
    subState: 'FRAMEWORK_COMPLETED',
    totalGpuNumber: 0,
    totalTaskNumber: 1,
    totalTaskRoleNumber: 1,
    username: 'test',
    virtualCluster: 'default'
}];
