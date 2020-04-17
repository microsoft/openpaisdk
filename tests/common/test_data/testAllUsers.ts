// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IUser } from '@api/v2';

/**
 * All users test data.
 */
export const testAllUsers: IUser[] = [{
    username: 'core',
    grouplist: [
        'adminGroup',
        'default',
        'admingroup'
    ],
    email: '',
    extension: {
        virtualCluster: [
            'default'
        ]
    },
    admin: true,
    virtualCluster: [
        'default'
    ]
}];
