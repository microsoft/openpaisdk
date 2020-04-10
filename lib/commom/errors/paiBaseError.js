"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base PAI error class.
 */
class PAIBaseError extends Error {
    constructor(error) {
        super(error.response.data.message);
        this.code = error.response.data.code;
    }
}
exports.PAIBaseError = PAIBaseError;
