// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AxiosError } from 'axios';

import { PAIBaseError } from './paiBaseError';
import { NoJobConfigError, NoJobError, UnauthorizedUserError } from './paiJobErrors';

export function paiError(error: AxiosError): void {
    if (error.response) {
        switch (error.response.data.code) {
            case 'NoJobError':
                throw new NoJobError(error);
            case 'NoJobConfigError':
                throw new NoJobConfigError(error);
            case 'UnauthorizedUserError':
                throw new UnauthorizedUserError(error);
            default:
                throw new PAIBaseError(error);
        }
    }
}
