"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * register storage related commands
 */
function registerStorageCommands(cli) {
    cli.registerCommand({ name: 'lists', help: 'list storages', aliases: ['list-storages'] }, [
        { name: 'alias', help: 'cluster alias' },
        { name: ['--skip-cache', '-k'], help: 'skip cached record, fetch latest value', action: 'storeTrue' }
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        return await client.cache.functions.getStorages(a.skip_cache);
    });
    cli.registerCommand({ name: 'getinfo', help: 'get info of destination path in storage' }, [
        { name: 'alias', help: 'cluster alias' },
        { name: 'storage', help: 'storage name' },
        { name: ['--skip-cache', '-k'], help: 'skip cached record, fetch latest value', action: 'storeTrue' }
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        return await client.cache.functions.getStorageByName(a.skip_cache, a.storage);
    });
}
exports.registerStorageCommands = registerStorageCommands;
