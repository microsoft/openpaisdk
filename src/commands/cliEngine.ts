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

import * as argparse from 'argparse';
import { Util } from '../commom/util';
import * as path from 'path';
import { IPAICluster, OpenPAIClient } from '..';
import { readJson, writeJson } from './utils';
import { ICacheRecord } from '../client/cacheClient';
import { Identifiable } from '../commom/identifiable';

interface IClusterWithCache {
    cluster: IPAICluster;
    cache?: ICacheRecord[];
}

interface ISubParserOptions extends argparse.SubArgumentParserOptions {
    name: string;
}

interface IArgumentOptions extends argparse.ArgumentOptions {
    name: string | string[];
}

interface IExclusiveArgGroup {
    required?: boolean;
    args: IArgumentOptions[];
}

/**
 * fix error TS2339: Property 'xxx' does not exist on type 'Namespace'.
 */
interface IArgument extends argparse.Namespace {
    [index: string]: any;
}

type CommandCallback = (a: IArgument) => any;

export interface IResult {
    command: string;
    args?: IArgument;
    result: any | undefined;
}

class LocalClustersManager extends Identifiable<IClusterWithCache, string> {
    protected uidOf = (a: IClusterWithCache) => a.cluster.alias!;

    public getClusterConfig(alias: string): IPAICluster {
        const result = this.find(alias);
        if (result) {
            return result.cluster;
        }
        throw new Error(`AliasNotFound: ${alias}`);
    };

    public getClusterClient(alias: string): OpenPAIClient {
        const result = this.find(alias);
        if (result) {
            if (!result.cache) {
                result.cache = []; // ! link cache space with the client
            }
            return new OpenPAIClient(result.cluster, result.cache);
        }
        throw new Error(`AliasNotFound: ${alias}`);
    };
}

export class CliEngine {
    protected clustersFileName?: string;
    public manager: LocalClustersManager;
    protected parser: argparse.ArgumentParser;
    protected subparsers: argparse.SubParser;
    protected executors: { [index: string]: CommandCallback; } = {};
    protected formatters: { [index: string]: (result: object) => void; } = {};

    constructor(input?: string | IClusterWithCache[]) {
        this.manager = new LocalClustersManager();
        if (input) {
            if (typeof input === 'string') {
                this.clustersFileName = Util.expandUser(input);
            } else {
                this.manager.copyData(input);
            }
        } else {
            this.clustersFileName = Util.expandUser(path.join('~', '.openpai', 'clusters.json'));
        }

        this.parser = new argparse.ArgumentParser({
            version: '0.1',
            addHelp: true,
            description: 'command line tool for OpenPAI (github.com/microsoft/pai)'
        });
        this.subparsers = this.parser.addSubparsers({ title: 'commands', dest: 'subcommand' });
    }

    public async load() {
        if (this.clustersFileName) {
            const data = await readJson<IClusterWithCache[]>(this.clustersFileName, []);
            this.manager.assignData(data);
        }
    }

    public async store() {
        if (this.clustersFileName) {
            await writeJson(this.clustersFileName, this.manager.getData());
        }
    }

    /**
     * register a sub command to the CLI engine
     */
    public registerCommand(subCommand: ISubParserOptions, args: IArgumentOptions[], cb: CommandCallback, exclusiveArgs?: IExclusiveArgGroup[]): void {
        const addArgument = (ps: argparse.ArgumentParser | argparse.ArgumentGroup, a: IArgumentOptions) => {
            let name = a.name;
            delete a.name;
            ps.addArgument(name, a as argparse.ArgumentOptions);
        };
        let cmd = subCommand.name;
        delete subCommand.name;
        if (subCommand.addHelp == null) { // null or undefined
            subCommand.addHelp = true;
        }
        let parser = this.subparsers.addParser(cmd, subCommand);
        for (const arg of args) {
            addArgument(parser, arg);
        }
        if (exclusiveArgs) {
            for (const g of exclusiveArgs) {
                let group = parser.addMutuallyExclusiveGroup({ required: g.required || false });
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
    public registerFormatter(name: string, cb: (result: object) => void): void {
        this.formatters[name] = (result) => {
            cb(result);
        };
    }

    /**
     * to evaluate a command (e.g. ['listj`, 'your-cluster1]) and return the result
     */
    public async evaluate(params?: string[]): Promise<IResult> {
        let args = this.parser.parseArgs(params);
        let cmd = args.subcommand;
        delete args.subcommand;
        Util.debug(cmd, args);

        let result = await Promise.resolve(this.executors[cmd](args));
        return { command: cmd, args: args, result: result };
    }

    /**
     * print the result with formatter to screen
     */
    public toScreen(result: IResult) {
        Util.debug('results received', result);
        if (result.command in this.formatters) {
            this.formatters[result.command](result);
        } else {
            if (result.result != null) {
                console.dir(result.result);
            } else {
                console.log();
            }
        }
    }
}
