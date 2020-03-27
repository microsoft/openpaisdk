// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CliEngine } from './cliEngine';
import { registerClusterCommands } from './clusterCommands';
import { registerJobCommands } from './jobCommands';
import { registerStorageCommands } from './storageCommands';

/**
 * register all sub commands
 */

const registerBuiltinCommands = (cli: CliEngine) => {
    registerClusterCommands(cli);
    registerJobCommands(cli);
    registerStorageCommands(cli);
};
export { CliEngine, registerBuiltinCommands };
