import { ILoginInfo, IPAICluster } from '@api/v2';
import { AxiosRequestConfig } from 'axios';
import { IPAIResponseProcessor } from './paiResponseProcessor';
/**
 * Http client for PAI rest-server.
 */
export declare class PAIHttpClient {
    protected static readonly TIMEOUT: number;
    private readonly cluster;
    constructor(cluster: IPAICluster);
    login(): Promise<ILoginInfo>;
    get<T>(url: string, processor?: IPAIResponseProcessor, options?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data: any, processor?: IPAIResponseProcessor, options?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data: any, processor?: IPAIResponseProcessor, options?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, processor?: IPAIResponseProcessor, options?: AxiosRequestConfig): Promise<T>;
    private defaultOptions;
}
