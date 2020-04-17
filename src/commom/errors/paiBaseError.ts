// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AxiosError } from 'axios';

/**
 * Base PAI error class.
 */
export class PAIBaseError extends Error {
    public code: string;

    constructor(error: AxiosError) {
        super(error.response!.data.message);
        this.code = error.response!.data.code;
    }
}
