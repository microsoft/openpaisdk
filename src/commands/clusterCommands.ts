// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { IPAICluster, OpenPAIClient } from '..';

import { CliEngine, IClusterWithCache } from './cliEngine';

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
