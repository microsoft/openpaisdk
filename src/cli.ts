#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
require('module-alias/register'); // tslint:disable-next-line:no-require-imports no-var-requires

import { registerBuiltinCommands, CliEngine } from './commands';
import { IResult } from './commands/cliEngine';

/**
 * the main entry point of the command line tool `pai`
 */
(async () => {
    // Util.debugMode = true;
    const cli: CliEngine = new CliEngine();
    registerBuiltinCommands(cli);
    await cli.load();
    const result: IResult = await cli.evaluate();
    cli.toScreen(result);
    await cli.store();
})().catch(err => console.error(err));
