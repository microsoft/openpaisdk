// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ILoginInfo, IPAICluster } from '@api/v2';
import { Util } from '@pai/commom/util';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import lodash from 'lodash';
import querystring from 'querystring';

import { paiError } from './errors/paiError';
import { processResponse, IPAIResponseProcessor } from './paiResponseProcessor';

/**
 * Http client for PAI rest-server.
 */
export class PAIHttpClient {
    protected static readonly TIMEOUT: number = 10 * 1000;
    protected static readonly EXPIRATION: number = 4000;
    private readonly cluster: IPAICluster;

    constructor(cluster: IPAICluster) {
        this.cluster = cluster;
    }

    /**
     * Login by username and password.
     * @param username Username, set undefined to use the username in cluster setting.
     * @param password Password, set undefined to use the password in cluster setting.
     * @param expiration Expiration time in seconds, default 4000s.
     */
    public async login(username?: string, password?: string, expiration?: number): Promise<ILoginInfo> {
        const url: string = Util.fixUrl(
            `${this.cluster.rest_server_uri}/api/v2/authn/basic/login`,
            this.cluster.https
        );
        try {
            const res: AxiosResponse<ILoginInfo> = await axios.post(
                url,
                querystring.stringify({
                    expiration: expiration || PAIHttpClient.EXPIRATION,
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
            throw paiError(error);
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
                    url,
                    lodash.merge(
                        {
                            ...<AxiosRequestConfig> {
                                responseType: 'text',
                                transformResponse: [(data) => { return data; }]
                            },
                            ...defaultOptions
                        },
                        options
                    )
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.get<T>(
                    url, lodash.merge(defaultOptions, options)
                );
                return res.data;
            }
        } catch (error) {
            throw paiError(error);
        }
    }

    public async post<T>(
        url: string, data: any, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.post(
                    url,
                    data,
                    lodash.merge(
                        {
                            ...<AxiosRequestConfig> {
                                responseType: 'text',
                                transformResponse: [(dat) => { return dat; }]
                            },
                            ...defaultOptions
                        },
                        options
                    )
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.post(
                    url, data, lodash.merge(defaultOptions, options)
                );
                return res.data;
            }
        } catch (error) {
            throw paiError(error);
        }
    }

    public async put<T>(
        url: string, data: any, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.put(
                    url,
                    data,
                    lodash.merge(
                        {
                            ...<AxiosRequestConfig> {
                                responseType: 'text',
                                transformResponse: [(dat) => { return dat; }]
                            },
                            ...defaultOptions
                        },
                        options
                    )
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.put(
                    url, data, lodash.merge(defaultOptions, options)
                );
                return res.data;
            }
        } catch (error) {
            throw paiError(error);
        }
    }

    public async delete<T>(
        url: string, processor?: IPAIResponseProcessor, options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const defaultOptions: AxiosRequestConfig = await this.defaultOptions();
            if (processor) {
                const res: AxiosResponse = await axios.delete(
                    url,
                    lodash.merge(
                        {
                            ...<AxiosRequestConfig> {
                                responseType: 'text',
                                transformResponse: [(data) => { return data; }]
                            },
                            ...defaultOptions
                        },
                        options
                    )
                );
                return processResponse(res, processor);
            } else {
                const res: AxiosResponse<T> = await axios.delete(
                    url, lodash.merge(defaultOptions, options)
                );
                return res.data;
            }
        } catch (error) {
            throw paiError(error);
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
