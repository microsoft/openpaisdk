import { AxiosResponse } from 'axios';
/**
 * The processor for PAI RestAPI response.
 */
export interface IPAIResponseProcessor {
    [statusCode: number]: (res: any) => any;
}
export declare function processResponse(res: AxiosResponse, processor: IPAIResponseProcessor): any;
