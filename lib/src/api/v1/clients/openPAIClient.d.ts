import { AuthnClient, JobClient } from "./";
import { IPAICluster } from "../../v2";
import { OpenPAIBaseClient } from "./baseClient";
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
