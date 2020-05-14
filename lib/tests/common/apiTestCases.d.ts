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
    logoutWithCorrectToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    logoutWithIncorrectToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    createUserByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    createUserByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    deleteUserByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    deleteUserByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserGroupByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserGroupByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    deleteUserGroupByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    deleteUserGroupByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserGrouplistByNonadminToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    updateUserGrouplistByApplicationToken(test: IApiTestItem, operationResults?: IOperationResults): Promise<void>;
    private userClientOperationByApplicationToken;
    private userClientOperationByNonadminToken;
    private createNonadminUserAndToken;
    private deleteNonadminUserAndToken;
}
export declare const CustomizedTests: CustomizedTestsClass;
export {};
