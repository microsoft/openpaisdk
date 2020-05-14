"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const paiBaseError_1 = require("./paiBaseError");
const paiJobErrors_1 = require("./paiJobErrors");
const paiUserErrors_1 = require("./paiUserErrors");
function paiError(error) {
    if (error.response) {
        switch (error.response.data.code) {
            case 'NoJobError':
                throw new paiJobErrors_1.NoJobError(error);
            case 'NoJobConfigError':
                throw new paiJobErrors_1.NoJobConfigError(error);
            case 'UnauthorizedUserError':
                throw new paiUserErrors_1.UnauthorizedUserError(error);
            case 'ForbiddenUserError':
                throw new paiUserErrors_1.ForbiddenUserError(error);
            case 'ConflictUserError':
                throw new paiUserErrors_1.ConflictUserError(error);
            case 'NoUserError':
                throw new paiUserErrors_1.NoUserError(error);
            case 'UnknownError':
                throw new paiJobErrors_1.UnknownError(error);
            default:
                throw new paiBaseError_1.PAIBaseError(error);
        }
    }
    return new paiBaseError_1.PAIBaseError(error);
}
exports.paiError = paiError;
