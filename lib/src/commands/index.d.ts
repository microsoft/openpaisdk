import { CliEngine } from "./cliEngine";
/**
 * register all sub commands
 */
declare const registerBuiltinCommands: (cli: CliEngine) => void;
export { CliEngine, registerBuiltinCommands };
