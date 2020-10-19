// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Event list test data.
 */
export const testEventList: any = {
    totalCount: 1,
    data: [
        {
            uid: 'b8a87b12-29de-4702-818a-442d5a97623e',
            frameworkName: '399af21acb5befd015d4c45f6c7c1eb9',
            podUid: '94920b63-f4d6-4c63-b72b-b926b8bc1334',
            taskroleName: 'taskrole',
            taskName: '399af21acb5befd015d4c45f6c7c1eb9-taskrole-11',
            taskIndex: 11,
            type: 'Warning',
            reason: 'FailedScheduling',
            message: '0/17 nodes are available: 1 Insufficient memory, 1 node(s) didn\'t match node selector, 1 node(s) were unschedulable, 14 Insufficient cpu, 16 Insufficient nvidia.com/gpu.',
            firstTimestamp: '2020-09-29T09:46:42.000Z',
            lastTimestamp: '2020-09-29T09:55:53.000Z',
            count: 9,
            sourceComponent: 'default-scheduler',
            sourceHost: null
        }
    ]
};