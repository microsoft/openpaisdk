import { PAIHttpClient } from '@pai/commom/paiHttpClient';
import { IPAICluster } from '@pai/v2';
/**
 * OpenPAI basic client.
 */
export declare class OpenPAIBaseClient {
    protected static readonly TIMEOUT: number;
    /**
     * get cluster configuration / info
     */
    config: any;
    protected readonly httpClient: PAIHttpClient;
    protected cluster: IPAICluster;
    constructor(cluster: IPAICluster);
    /**
     * parse information from pai_uri
     * refer to tests/unit_tests/baseClient.spec.ts
     */
    static parsePaiUri(cluster: IPAICluster): IPAICluster;
    /**
     * Get OpenPAI access token, will call /api/v1/token.
     */
    token(): Promise<string>;
}
