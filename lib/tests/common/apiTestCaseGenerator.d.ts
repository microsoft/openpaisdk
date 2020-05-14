import { IPAICluster } from "../../src/api/v2";
/**
 * Generate test cases from swagger.
 * e.g. ts-node .\apiTestCaseGenerator.ts -- "../../src/api/v2/swagger.yaml" "./apiTestCase.json"
 */
export declare class ApiTestCaseGenerator {
    generate(swaggerPath?: string, outputPath?: string): Promise<IApiTestCase[]>;
}
export interface IApiOperationParameter {
    type: 'raw' | 'fromResult';
    value?: any;
    resultType?: 'beforeEachResults' | 'beforeResults' | 'testResults';
    resultPath?: any[];
    resultIndex?: number;
}
export interface IApiOperation {
    tag?: string;
    operationId?: string;
    cluster?: IPAICluster;
    parameters?: IApiOperationParameter[];
    response?: {
        statusCode?: number;
        schema?: any;
        contentType?: string;
        expectResult?: any;
    };
}
export interface IApiTestItem {
    description?: string;
    before?: IApiOperation[];
    operation?: IApiOperation;
    after?: IApiOperation[];
    /**
     * Reference to the method name in CustomizedTests class,
     * will skip other operations (before, operation, after)
     */
    customizedTest?: string;
}
export interface IApiTestCase {
    description?: string;
    beforeEach?: IApiOperation[];
    before?: IApiOperation[];
    tests: IApiTestItem[];
    after?: IApiOperation[];
    afterEach?: IApiOperation[];
    schemas?: {
        [key: string]: any;
    };
}
