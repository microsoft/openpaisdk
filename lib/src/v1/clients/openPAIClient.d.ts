import { AuthnClient, JobClient } from '@pai/v1/clients';
import { IPAICluster } from '@pai/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI Client.
 */
export declare class OpenPAIClient extends OpenPAIBaseClient {
    /**
     * OpenPAI Job Client.
     */
    job: JobClient;
    /**
     * OpenPAI Authn Client.
     */
    authn: AuthnClient;
    constructor(cluster: IPAICluster);
}
