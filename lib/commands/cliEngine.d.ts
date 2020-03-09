import * as argparse from 'argparse';
import { IPAICluster, OpenPAIClient } from '..';
import { ICacheRecord } from '../client/cacheClient';
import { Identifiable } from '../commom/identifiable';
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
declare type CommandCallback = (a: IArgument) => any;
export interface IResult {
    command: string;
    args?: IArgument;
    result: any | undefined;
}
/**
 * LocalClustersManager handles the prestored array of clusters and caches
 * by providing filtering, and client construction
 */
declare class LocalClustersManager extends Identifiable<IClusterWithCache, string> {
    getClusterConfig(alias: string): IPAICluster;
    getClusterClient(alias: string): OpenPAIClient;
    protected uidOf: (a: IClusterWithCache) => string;
}
/**
 * CliEngine is the executor of CLI commands processing
 */
export declare class CliEngine {
    manager: LocalClustersManager;
    protected clustersFileName?: string;
    protected parser: argparse.ArgumentParser;
    protected subparsers: argparse.SubParser;
    protected executors: {
        [index: string]: CommandCallback;
    };
    protected formatters: {
        [index: string]: (result: object) => void;
    };
    constructor(input?: string | IClusterWithCache[]);
    load(): Promise<void>;
    store(): Promise<void>;
    /**
     * register a sub command to the CLI engine
     */
    registerCommand(subCommand: ISubParserOptions, args: IArgumentOptions[], cb: CommandCallback, exclusiveArgs?: IExclusiveArgGroup[]): void;
    /**
     * provide a formatter callback to process the result for screen printing
     */
    registerFormatter(name: string, cb: (result: object) => void): void;
    /**
     * to evaluate a command (e.g. ['listj`, 'your-cluster1]) and return the result
     */
    evaluate(params?: string[]): Promise<IResult>;
    /**
     * print the result with formatter to screen
     */
    toScreen(result: IResult): void;
}
export {};
