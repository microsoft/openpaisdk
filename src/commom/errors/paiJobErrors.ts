// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PAIBaseError } from './paiBaseError';

/**
 * No job error.
 */
export class NoJobError extends PAIBaseError {}

/**
 * No job config error.
 */
export class NoJobConfigError extends PAIBaseError {}

/**
 * Unauthorized user error.
 */
export class UnauthorizedUserError extends PAIBaseError {}
