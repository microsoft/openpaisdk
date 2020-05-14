import { IOperationResults } from "../api_tests/v2/api.v2.spec";
import { IApiTestCase, IApiTestItem } from "./apiTestCaseGenerator";
/**
 * API default test cases will be add to the test case generator.
 */
export declare const ApiDefaultTestCases: {
    [key: string]: IApiTestCase;
};
/**
 * Customized tests
 */
declare class CustomizedTestsClass {
    private readonly ajvInstance;
    getTokensWithUnauthorizedUser(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
}
export declare const CustomizedTests: CustomizedTestsClass;
export {};
