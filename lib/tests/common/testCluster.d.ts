import { IPAICluster } from "../../src/api/v2";
/**
 * Test cluster class, load test cluster info for e2e tests.
 */
declare class TestClusterClass {
    readonly cluster: IPAICluster;
    constructor(clusterAlias?: string);
}
export declare const TestCluster: TestClusterClass;
export {};
