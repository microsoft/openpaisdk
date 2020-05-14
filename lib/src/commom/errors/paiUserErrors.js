"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: max-classes-per-file
const paiBaseError_1 = require("./paiBaseError");
/**
 * Unauthorized user error.
 */
class UnauthorizedUserError extends paiBaseError_1.PAIBaseError {
}
exports.UnauthorizedUserError = UnauthorizedUserError;
/**
 * Forbidden user error.
 */
class ForbiddenUserError extends paiBaseError_1.PAIBaseError {
}
exports.ForbiddenUserError = ForbiddenUserError;
/**
 * Conflict user error.
 */
class ConflictUserError extends paiBaseError_1.PAIBaseError {
}
exports.ConflictUserError = ConflictUserError;
/**
 * No user error.
 */
class NoUserError extends paiBaseError_1.PAIBaseError {
}
exports.NoUserError = NoUserError;
