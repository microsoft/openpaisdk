// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AxiosError } from 'axios';

/**
 * Base PAI error class.
 */
export class PAIBaseError extends Error {
    public status: number;
    public data: any;

    constructor(error: AxiosError) {
        super(error.response!.data.message);
        this.status = error.response!.status;
        this.data = error.response!.data;
    }
}
