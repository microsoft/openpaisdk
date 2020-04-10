#!/usr/bin/env node
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
/**
 * the main entry point of the command line tool `pai`
 */
(async () => {
    // Util.debugMode = true;
    const cli = new commands_1.CliEngine();
    commands_1.registerBuiltinCommands(cli);
    await cli.load();
    const result = await cli.evaluate();
    cli.toScreen(result);
    await cli.store();
})().catch(err => console.error(err));
