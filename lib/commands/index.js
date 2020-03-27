"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const cliEngine_1 = require("./cliEngine");
exports.CliEngine = cliEngine_1.CliEngine;
const clusterCommands_1 = require("./clusterCommands");
const jobCommands_1 = require("./jobCommands");
const storageCommands_1 = require("./storageCommands");
/**
 * register all sub commands
 */
const registerBuiltinCommands = (cli) => {
    clusterCommands_1.registerClusterCommands(cli);
    jobCommands_1.registerJobCommands(cli);
    storageCommands_1.registerStorageCommands(cli);
};
exports.registerBuiltinCommands = registerBuiltinCommands;
