// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenPAIClient } from '@api/v2';

import { CliEngine } from './cliEngine';

/**
 * register storage related commands
 */
export function registerStorageCommands(cli: CliEngine): void {
    cli.registerCommand(
        { name: 'lists', help: 'list storages', aliases: ['list-storages'] },
        [
            { name: 'alias', help: 'cluster alias' },
            { name: ['--skip-cache', '-k'], help: 'skip cached record, fetch latest value', action: 'storeTrue' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            return await client.cache.functions.getStorages(a.skip_cache);
        }
    );

    cli.registerCommand(
        { name: 'getinfo', help: 'get info of destination path in storage' },
        [
            { name: 'alias', help: 'cluster alias' },
            { name: 'storage', help: 'storage name' },
            { name: ['--skip-cache', '-k'], help: 'skip cached record, fetch latest value', action: 'storeTrue' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            return await client.cache.functions.getStorageByName(a.skip_cache, a.storage);
        }
    );
}
