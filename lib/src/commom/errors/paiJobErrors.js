"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: max-classes-per-file
const paiBaseError_1 = require("./paiBaseError");
/**
 * No job error.
 */
class NoJobError extends paiBaseError_1.PAIBaseError {
}
exports.NoJobError = NoJobError;
/**
 * No job config error.
 */
class NoJobConfigError extends paiBaseError_1.PAIBaseError {
}
exports.NoJobConfigError = NoJobConfigError;
/**
 * No job config error.
 */
class UnknownError extends paiBaseError_1.PAIBaseError {
}
exports.UnknownError = UnknownError;
