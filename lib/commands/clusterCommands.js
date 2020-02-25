"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const baseClient_1 = require("../client/baseClient");
const __1 = require("..");
const util_1 = require("../commom/util");
const identifiable_1 = require("../commom/identifiable");
const path_1 = require("path");
const fs = require("fs-extra");
class LocalClustersManager extends identifiable_1.Identifiable {
    constructor(pth, clusters) {
        super((a) => {
            return a.alias;
        }, clusters);
        this.clustersFilePath = '~/.openpai/clusters.json';
        this.clustersFilePath = util_1.Util.expandUser(pth ? pth : this.clustersFilePath);
    }
    async load() {
        try {
            util_1.Util.debug(`try to load clusters from ${this.clustersFilePath}`);
            this.data = await fs.readJson(this.clustersFilePath);
            util_1.Util.debug(undefined, this.data);
        }
        catch (e) {
            console.warn(e.message);
        }
    }
    async store() {
        util_1.Util.debug(undefined, this.data);
        util_1.Util.debug(`try to save clusters to ${this.clustersFilePath}`);
        let folder = path_1.dirname(this.clustersFilePath);
        await fs.ensureDir(path_1.dirname(this.clustersFilePath));
        await fs.writeJSON(this.clustersFilePath, this.data);
        util_1.Util.debug(`saved to ${this.clustersFilePath}`);
    }
}
exports.LocalClustersManager = LocalClustersManager;
exports.registerClusterCommands = (cli) => {
    cli.registerCommand({ name: 'listc', help: 'list clusters' }, [], async (a) => {
        let manager = new LocalClustersManager(cli.clusterConfigFile);
        await manager.load();
        return manager.data;
    });
    cli.registerCommand({ name: 'addc', help: 'add cluster' }, [
        { name: 'pai_uri', help: 'url of OpenPAI cluster like http(s)://x.x.x' },
        { name: 'username' },
        { name: 'token' },
        { name: ['--alias', '-a'], help: 'cluster alias' }
    ], async (a) => {
        let manager = new LocalClustersManager(cli.clusterConfigFile);
        await manager.load();
        let cluster = baseClient_1.OpenPAIBaseClient.parsePaiUri(a);
        manager.add(cluster);
        await manager.store();
    });
};
exports.getClusterConfig = async (cli, alias) => {
    let manager = new LocalClustersManager(cli.clusterConfigFile);
    await manager.load();
    const result = manager.find(alias);
    if (result) {
        return result;
    }
    throw new Error(`AliasNotFound: ${alias}`);
};
exports.getClusterClient = async (cli, alias) => {
    let config = await exports.getClusterConfig(cli, alias);
    return new __1.OpenPAIClient(config);
};
