// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AxiosError } from 'axios';

import { PAIBaseError } from './paiBaseError';
import {
    NoJobConfigError,
    NoJobError
} from './paiJobErrors';
import {
    ConflictUserError,
    ForbiddenUserError,
    NoUserError,
    UnauthorizedUserError
} from './paiUserErrors';

export function paiError(error: AxiosError): PAIBaseError {
    if (error.response) {
        switch (error.response.data.code) {
            case 'NoJobError':
                throw new NoJobError(error);
            case 'NoJobConfigError':
                throw new NoJobConfigError(error);
            case 'UnauthorizedUserError':
                throw new UnauthorizedUserError(error);
            case 'ForbiddenUserError':
                throw new ForbiddenUserError(error);
            case 'ConflictUserError':
                throw new ConflictUserError(error);
            case 'NoUserError':
                throw new NoUserError(error);
            default:
                throw new PAIBaseError(error);
        }
    }

    return new PAIBaseError(error);
}
