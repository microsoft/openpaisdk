// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ILoginInfo, IPAICluster } from '@api/v2';
import { Util } from '@pai/commom/util';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import querystring from 'querystring';

import { paiError } from './errors/paiError';
import { processResponse, IPAIResponseProcessor } from './paiResponseProcessor';

/**
 * Http client for PAI rest-server.
 */
export class PAIHttpClient {
    protected static readonly TIMEOUT: number = 10 * 1000;
    private readonly cluster: IPAICluster;

    constructor(cluster: IPAICluster) {
        this.cluster = cluster;
    }

    public async login(username?: string, password?: string): Promise<ILoginInfo> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/authn/basic/login`,
            this.cluster.https
        );
        try {
            const res: AxiosResponse<ILoginInfo> = await axios.post(
                url,
                querystring.stringify({
                    expiration: 4000,
                    password: password ? password : this.cluster.password,
                    username: username ? username : this.cluster.username
                }),
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    public async get<T>(
        url: string, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}, query?: object
    ): Promise<T> {
        try {
            if (query) {
                const qstrings: string[] = [];
                Object.entries(query).forEach(
                    ([k, v]) => {
                        if (v !== undefined) {
                            qstrings.push(`${k}=${v}`);
                        }
                    }
                );
                if (qstrings.length > 0) {
                    url = `${url}?${qstrings.join('&')}`;
                }
            }
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.get(
                    url, { ...{ responseType: 'text' }, ...defaultOptions, ...options }
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.get<T>(
                    url, { ...defaultOptions, ...options }
                );
                return res.data;
            }
        } catch (error) {
            paiError(error);
            throw error;
        }
    }

    public async post<T>(
        url: string, data: any, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.post(
                    url, data, { ...{ responseType: 'text' }, ...defaultOptions, ...options }
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.post(
                    url, data, { ...defaultOptions, ...options }
                );
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    public async put<T>(
        url: string, data: any, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.put(
                    url, data, { ...{ responseType: 'text' }, ...defaultOptions, ...options }
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.put(
                    url, data, { ...defaultOptions, ...options }
                );
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    public async delete<T>(
        url: string, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.delete(
                    url, { ...{ responseType: 'text' }, ...defaultOptions, ...options }
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.delete(
                    url, { ...defaultOptions, ...options }
                );
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    private async defaultOptions(): Promise<AxiosRequestConfig> {
        if (!this.cluster.token) {
            const info: ILoginInfo = await this.login();
            this.cluster.token = info.token;
        }

        return {
            headers: {
                Authorization: `Bearer ${this.cluster.token}`,
                'content-type': 'application/json'
            },
            timeout: PAIHttpClient.TIMEOUT
        };
    }
}
