"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("@api/v2");
const argparse = require("argparse");
const path = require("path");
const identifiable_1 = require("../commom/identifiable");
const util_1 = require("../commom/util");
const utils_1 = require("./utils");
function defaultFommater(result) {
    const cout = (msg) => {
        if (typeof result.result === 'string') {
            console.log(result.result);
        }
        else {
            console.log(JSON.stringify(result.result || '', undefined, 4));
        }
    };
    cout(result.result || '');
}
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
            return new v2_1.OpenPAIClient(this.data[idx].cluster, this.data[idx].cache);
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
    registerCommand(subCommand, args, cb, exclusiveArgs, formatter) {
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
        this.formatters[cmd] = formatter || defaultFommater;
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
        this.formatters[result.command](result);
    }
}
exports.CliEngine = CliEngine;
