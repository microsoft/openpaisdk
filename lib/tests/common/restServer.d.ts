import { IPAICluster } from '@api/v2';
import * as nock from 'nock';
/**
 * Fake rest server.
 */
declare class RestServer {
    cluster: IPAICluster;
    testUri: string;
    alias: string;
    listJobs: () => nock.Scope;
    listJobsQuery: () => nock.Scope;
    queryJobStatus: () => nock.Scope;
}
export declare const fakeRestSrv: RestServer;
export {};
