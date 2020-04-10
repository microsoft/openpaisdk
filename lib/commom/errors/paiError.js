"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const paiBaseError_1 = require("./paiBaseError");
const paiJobErrors_1 = require("./paiJobErrors");
function paiError(error) {
    if (error.response) {
        switch (error.response.data.code) {
            case 'NoJobError':
                throw new paiJobErrors_1.NoJobError(error);
            case 'NoJobConfigError':
                throw new paiJobErrors_1.NoJobConfigError(error);
            default:
                throw new paiBaseError_1.PAIBaseError(error);
        }
    }
}
exports.paiError = paiError;
