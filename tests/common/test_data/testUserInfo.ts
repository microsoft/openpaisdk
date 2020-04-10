// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IUserInfo } from '@pai/v2';

/**
 * User info test data.
 */
export const testUserInfo: IUserInfo = {
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
