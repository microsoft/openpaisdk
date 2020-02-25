import { CliEngine } from './cliEngine';
import { IPAICluster, OpenPAIClient } from '..';
import { Identifiable } from '../commom/identifiable';
export declare class LocalClustersManager extends Identifiable<IPAICluster, string> {
    clustersFilePath: string;
    constructor(pth?: string | undefined, clusters?: IPAICluster[] | undefined);
    load(): Promise<void>;
    store(): Promise<void>;
}
export declare const registerClusterCommands: (cli: CliEngine) => void;
export declare const getClusterConfig: (cli: CliEngine, alias: string) => Promise<IPAICluster>;
export declare const getClusterClient: (cli: CliEngine, alias: string) => Promise<OpenPAIClient>;
