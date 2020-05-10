// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// tslint:disable: max-classes-per-file
import { PAIBaseError } from './paiBaseError';

/**
 * No job error.
 */
export class NoJobError extends PAIBaseError {}

/**
 * No job config error.
 */
export class NoJobConfigError extends PAIBaseError {}
