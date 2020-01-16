import { ILoginInfo } from '../models/authn';
import { IPAICluster, IPAIClusterInfo } from '../models/cluster';
/**
 * OpenPAI basic client.
 */
export declare class OpenPAIBaseClient {
    protected static readonly TIMEOUT: number;
    protected cluster: IPAICluster;
    private cacheToken?;
    constructor(cluster: IPAICluster);
    /**
     * Get OpenPAI access token, will call /api/v1/token.
     */
    token(): Promise<string>;
    /**
     * Basic login.
     */
    login(): Promise<ILoginInfo>;
    /**
     * Get OpenPAI cluster info, will call /api/v1.
     */
    getClusterInfo(): Promise<IPAIClusterInfo>;
}
