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

import { CliEngine } from './cliEngine';
import { OpenPAIBaseClient } from '../client/baseClient';
import { IPAICluster, OpenPAIClient } from '..';

import { Util } from '../commom/util';
import { Identifiable } from '../commom/identifiable';
import { dirname } from 'path';
import * as fs from 'fs-extra';
import { MINIMAL_SCHEMA } from 'js-yaml';

export class LocalClustersManager extends Identifiable<IPAICluster, string> {
    public clustersFilePath: string = '~/.openpai/clusters.json';

    constructor(pth?: string | undefined, clusters?: IPAICluster[] | undefined) {
        super((a: IPAICluster) => {
            return a.alias!;
        }, clusters);
        this.clustersFilePath = Util.expandUser(pth ? pth : this.clustersFilePath);
    }

    public async load(): Promise<void> {
        try {
            Util.debug(`try to load clusters from ${this.clustersFilePath}`);
            this.data = await fs.readJson(this.clustersFilePath);
            Util.debug(undefined, this.data);
        } catch (e) {
            console.warn((e as Error).message);
        }
    }

    public async store(): Promise<void> {
        Util.debug(undefined, this.data);
        Util.debug(`try to save clusters to ${this.clustersFilePath}`);
        let folder: string = dirname(this.clustersFilePath);
        await fs.ensureDir(dirname(this.clustersFilePath));
        await fs.writeJSON(this.clustersFilePath, this.data);
        Util.debug(`saved to ${this.clustersFilePath}`);
    }

}

export const registerClusterCommands = (cli: CliEngine) => {
    cli.registerCommand(
        { name: 'listc', help: 'list clusters' },
        [],
        async (a) => {
            let manager = new LocalClustersManager(cli.clusterConfigFile);
            await manager.load();
            return manager.data;
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
        async (a) => {
            let manager = new LocalClustersManager(cli.clusterConfigFile);
            await manager.load();
            let cluster = OpenPAIBaseClient.parsePaiUri(a as IPAICluster);
            manager.add(cluster);
            await manager.store();
        }
    );

    cli.registerCommand(
        { name: 'delc', help: 'delete cluster' },
        [
            { name: 'alias', help: 'alias to remove' }
        ],
        async (a) => {
            let manager = new LocalClustersManager(cli.clusterConfigFile);
            await manager.load();
            manager.remove(a.alias);
            await manager.store();
        }
    );
};

export const getClusterConfig = async (cli: CliEngine, alias: string): Promise<IPAICluster> => {
    let manager = new LocalClustersManager(cli.clusterConfigFile);
    await manager.load();
    const result = manager.find(alias);
    if (result) {
        return result;
    }
    throw new Error(`AliasNotFound: ${alias}`);
};

export const getClusterClient = async (cli: CliEngine, alias: string): Promise<OpenPAIClient> => {
    let config = await getClusterConfig(cli, alias);
    return new OpenPAIClient(config);
};
