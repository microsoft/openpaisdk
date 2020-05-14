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
        this.status = error.response.status;
        this.data = error.response.data;
    }
}
exports.PAIBaseError = PAIBaseError;
