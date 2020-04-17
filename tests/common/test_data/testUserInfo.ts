// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IUser } from '@api/v2';

/**
 * User info test data.
 */
export const testUserInfo: IUser = {
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
};
