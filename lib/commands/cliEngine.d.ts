import * as argparse from 'argparse';
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
export declare class CliEngine {
    clusterConfigFile?: string;
    private parser;
    private subparsers;
    private executors;
    private formatters;
    constructor(clusterFile?: string);
    registerCommand(subCommand: ISubParserOptions, args: IArgumentOptions[], cb: CommandCallback, exclusiveArgs?: IExclusiveArgGroup[]): void;
    registerFormatter(name: string, cb: (result: object) => void): void;
    evaluate(params?: string[], toScreen?: boolean): Promise<any>;
}
export {};
