import * as argparse from 'argparse';
interface ISubParserOptions extends argparse.SubArgumentParserOptions {
    name: string;
}
interface IArgumentOptions extends argparse.ArgumentOptions {
    name: string | string[];
}
/**
 * fix error TS2339: Property 'xxx' does not exist on type 'Namespace'.
 */
interface IArgument extends argparse.Namespace {
    [index: string]: any;
}
declare type CommandCallback = (a: IArgument) => any;
export declare class CliEngine {
    [index: string]: any;
    clusterConfigFile?: string;
    parser: argparse.ArgumentParser;
    subparsers: argparse.SubParser;
    constructor(clusterFile?: string);
    registerCommand(subCommand: ISubParserOptions, args: IArgumentOptions[], cb: CommandCallback): void;
    execute(): void;
}
export {};
