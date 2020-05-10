// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// tslint:disable: max-classes-per-file
import { PAIBaseError } from './paiBaseError';

/**
 * Unauthorized user error.
 */
export class UnauthorizedUserError extends PAIBaseError {}

/**
 * Forbidden user error.
 */
export class ForbiddenUserError extends PAIBaseError {}

/**
 * Conflict user error.
 */
export class ConflictUserError extends PAIBaseError {}

/**
 * No user error.
 */
export class NoUserError extends PAIBaseError {}
