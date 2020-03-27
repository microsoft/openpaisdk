// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster, OpenPAIClient } from '..';

import { CliEngine, IClusterWithCache, IResult } from './cliEngine';
import { table2Console } from './utils';

/**
 *  register commands related to cluster management
 */
export const registerClusterCommands = (cli: CliEngine) => {
    cli.registerCommand(
        { name: 'listc', help: 'list clusters' },
        [],
        (a) => {
            const result: IClusterWithCache[] = cli.manager.getData();
            return result.map((x) => x.cluster);
        },
        undefined,
        (r: IResult) => {
            const clusters = r.result as IPAICluster[];
            const rows: any[][] = [
                ['alias', 'uri', 'user', 'https']
            ];
            clusters.forEach(cluster => rows.push([
                cluster.alias, cluster.pai_uri, cluster.username, cluster.https
            ]));
            table2Console(rows);
        }
    );

    cli.registerCommand(
        { name: 'addc', help: 'add cluster' },
        [
            { name: 'pai_uri', help: 'url of OpenPAI cluster like http(s)://x.x.x' },
            { name: 'username' },
            { name: 'token' },
            { name: ['--alias', '-a'], help: 'cluster alias' }
        ],
        (a) => {
            cli.manager.add({ cluster: OpenPAIClient.parsePaiUri(a as IPAICluster) });
        }
    );

    cli.registerCommand(
        { name: 'delc', help: 'delete cluster' },
        [
            { name: 'alias', help: 'alias to remove' }
        ],
        (a) => {
            cli.manager.remove(a.alias);
        }
    );
};
