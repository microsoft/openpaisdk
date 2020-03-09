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
const argparse = require("argparse");
const path = require("path");
const __1 = require("..");
const identifiable_1 = require("../commom/identifiable");
const util_1 = require("../commom/util");
const utils_1 = require("./utils");
/**
 * LocalClustersManager handles the prestored array of clusters and caches
 * by providing filtering, and client construction
 */
class LocalClustersManager extends identifiable_1.Identifiable {
    constructor() {
        super(...arguments);
        this.uidOf = (a) => a.cluster.alias;
    }
    getClusterConfig(alias) {
        const idx = this.indexOf(alias);
        if (idx > -1) {
            return this.data[idx].cluster;
        }
        throw new Error(`AliasNotFound: ${alias}`);
    }
    getClusterClient(alias) {
        const idx = this.indexOf(alias);
        if (idx > -1) {
            if (!this.data[idx].cache) {
                this.data[idx].cache = []; // ! link cache space with the client
            }
            return new __1.OpenPAIClient(this.data[idx].cluster, this.data[idx].cache);
        }
        throw new Error(`AliasNotFound: ${alias}`);
    }
}
/**
 * CliEngine is the executor of CLI commands processing
 */
class CliEngine {
    constructor(input) {
        this.executors = {};
        this.formatters = {};
        this.manager = new LocalClustersManager();
        if (input) {
            if (typeof input === 'string') {
                this.clustersFileName = util_1.Util.expandUser(input);
            }
            else {
                this.manager.copyData(input);
            }
        }
        else {
            this.clustersFileName = util_1.Util.expandUser(path.join('~', '.openpai', 'clusters.json'));
        }
        this.parser = new argparse.ArgumentParser({
            version: '0.1',
            addHelp: true,
            description: 'command line tool for OpenPAI (github.com/microsoft/pai)'
        });
        this.subparsers = this.parser.addSubparsers({ title: 'commands', dest: 'subcommand' });
    }
    async load() {
        if (this.clustersFileName) {
            const data = await utils_1.readJson(this.clustersFileName, []);
            this.manager.assignData(data);
        }
    }
    async store() {
        if (this.clustersFileName) {
            await utils_1.writeJson(this.clustersFileName, this.manager.getData());
        }
    }
    /**
     * register a sub command to the CLI engine
     */
    registerCommand(subCommand, args, cb, exclusiveArgs) {
        const addArgument = (ps, a) => {
            const name = a.name;
            delete a.name;
            ps.addArgument(name, a);
        };
        const cmd = subCommand.name;
        delete subCommand.name;
        if (subCommand.addHelp == null) { // null or undefined
            subCommand.addHelp = true;
        }
        const parser = this.subparsers.addParser(cmd, subCommand);
        for (const arg of args) {
            addArgument(parser, arg);
        }
        if (exclusiveArgs) {
            for (const g of exclusiveArgs) {
                const group = parser.addMutuallyExclusiveGroup({ required: g.required || false });
                for (const arg of g.args) {
                    addArgument(group, arg);
                }
            }
        }
        this.executors[cmd] = cb;
    }
    /**
     * provide a formatter callback to process the result for screen printing
     */
    registerFormatter(name, cb) {
        this.formatters[name] = (result) => {
            cb(result);
        };
    }
    /**
     * to evaluate a command (e.g. ['listj`, 'your-cluster1]) and return the result
     */
    async evaluate(params) {
        const args = this.parser.parseArgs(params);
        const cmd = args.subcommand;
        delete args.subcommand;
        util_1.Util.debug(cmd, args);
        const result = await Promise.resolve(this.executors[cmd](args));
        return { command: cmd, args: args, result: result };
    }
    /**
     * print the result with formatter to screen
     */
    toScreen(result) {
        util_1.Util.debug('results received', result);
        if (result.command in this.formatters) {
            this.formatters[result.command](result);
        }
        else {
            if (result.result != null) {
                console.dir(result.result);
            }
            else {
                console.log();
            }
        }
    }
}
exports.CliEngine = CliEngine;
