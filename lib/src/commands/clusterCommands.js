"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const utils_1 = require("./utils");
/**
 *  register commands related to cluster management
 */
exports.registerClusterCommands = (cli) => {
    cli.registerCommand({ name: 'listc', help: 'list clusters' }, [], (a) => {
        const result = cli.manager.getData();
        return result.map((x) => x.cluster);
    }, undefined, (r) => {
        const clusters = r.result;
        const rows = [
            ['alias', 'uri', 'user', 'https']
        ];
        clusters.forEach(cluster => rows.push([
            cluster.alias, cluster.pai_uri, cluster.username, cluster.https
        ]));
        utils_1.table2Console(rows);
    });
    cli.registerCommand({ name: 'addc', help: 'add cluster' }, [
        { name: 'pai_uri', help: 'url of OpenPAI cluster like http(s)://x.x.x' },
        { name: 'username' },
        { name: 'token' },
        { name: ['--alias', '-a'], help: 'cluster alias' }
    ], (a) => {
        cli.manager.add({ cluster: v2_1.OpenPAIClient.parsePaiUri(a) });
    });
    cli.registerCommand({ name: 'delc', help: 'delete cluster' }, [
        { name: 'alias', help: 'alias to remove' }
    ], (a) => {
        cli.manager.remove(a.alias);
    });
};
