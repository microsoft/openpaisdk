// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as argparse from 'argparse';
import * as path from 'path';

import { IPAICluster, OpenPAIClient } from '..';
import { ICacheRecord } from '../client/v2/cacheClient';
import { Identifiable } from '../commom/identifiable';
import { Util } from '../commom/util';

import { readJson, writeJson } from './utils';

export interface IClusterWithCache {
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

export interface IResult {
    command: string;
    args?: IArgument;
    result: any | undefined;
}

type CommandCallback = (a: IArgument) => any;
type FormmaterCallback = (r: IResult) => void;

function defaultFommater(result: IResult): void {
    const cout = (msg: string | object) => {
        if (typeof result.result === 'string') {
            console.log(result.result);
        } else {
            console.log(JSON.stringify(result.result || "", undefined, 4));
        }
    };
    cout(result.result || "");
}

/**
 * LocalClustersManager handles the prestored array of clusters and caches
 * by providing filtering, and client construction
 */
class LocalClustersManager extends Identifiable<IClusterWithCache, string> {
    public getClusterConfig(alias: string): IPAICluster {
        const idx: number = this.indexOf(alias);
        if (idx > -1) {
            return this.data[idx].cluster;
        }
        throw new Error(`AliasNotFound: ${alias}`);
    }
    public getClusterClient(alias: string): OpenPAIClient {
        const idx: number = this.indexOf(alias);
        if (idx > -1) {
            if (!this.data[idx].cache) {
                this.data[idx].cache = []; // ! link cache space with the client
            }
            return new OpenPAIClient(this.data[idx].cluster, this.data[idx].cache);
        }
        throw new Error(`AliasNotFound: ${alias}`);
    } protected uidOf = (a: IClusterWithCache) => a.cluster.alias!;
}

/**
 * CliEngine is the executor of CLI commands processing
 */
export class CliEngine {
    public manager: LocalClustersManager;
    protected clustersFileName?: string;
    protected parser: argparse.ArgumentParser;
    protected subparsers: argparse.SubParser;
    protected executors: { [index: string]: CommandCallback; } = {};
    protected formatters: { [index: string]: FormmaterCallback; } = {};

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

    public async load(): Promise<void> {
        if (this.clustersFileName) {
            const data: IClusterWithCache[] = await readJson<IClusterWithCache[]>(this.clustersFileName, []);
            this.manager.assignData(data);
        }
    }

    public async store(): Promise<void> {
        if (this.clustersFileName) {
            await writeJson(this.clustersFileName, this.manager.getData());
        }
    }

    /**
     * register a sub command to the CLI engine
     */
    public registerCommand(
        subCommand: ISubParserOptions,
        args: IArgumentOptions[],
        cb: CommandCallback,
        exclusiveArgs?: IExclusiveArgGroup[],
        formatter?: FormmaterCallback
    ): void {
        const addArgument = (ps: argparse.ArgumentParser | argparse.ArgumentGroup, a: IArgumentOptions) => {
            const name: string | string[] = a.name;
            delete a.name;
            ps.addArgument(name, a as argparse.ArgumentOptions);
        };
        const cmd: string = subCommand.name;
        delete subCommand.name;
        if (subCommand.addHelp == null) { // null or undefined
            subCommand.addHelp = true;
        }
        const parser: argparse.ArgumentParser = this.subparsers.addParser(cmd, subCommand);
        for (const arg of args) {
            addArgument(parser, arg);
        }
        if (exclusiveArgs) {
            for (const g of exclusiveArgs) {
                const group: argparse.ArgumentGroup = parser.addMutuallyExclusiveGroup({ required: g.required || false });
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
    public async evaluate(params?: string[]): Promise<IResult> {
        const args: any = this.parser.parseArgs(params);
        const cmd: string = args.subcommand;
        delete args.subcommand;
        Util.debug(cmd, args);

        const result: any = await Promise.resolve(this.executors[cmd](args));
        return { command: cmd, args: args, result: result };
    }

    /**
     * print the result with formatter to screen
     */
    public toScreen(result: IResult): void {
        Util.debug('results received', result);
        this.formatters[result.command](result);
    }
}
