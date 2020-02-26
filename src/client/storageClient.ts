// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// tslint:disable-next-line:match-default-export-name
import axios, { AxiosResponse } from 'axios';

import { Util } from '../commom/util';
import { IPAICluster } from '../models/cluster';
import { IStorageConfig, IStorageServer, IStorageSummary, IStorageDetail } from '../models/storage';

import { OpenPAIBaseClient } from './baseClient';

/**
 * OpenPAI Job client.
 */
export class StorageClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster) {
        super(cluster);
    }

    /**
     * Get storage informations.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    public async getServer(names?: string, token?: string): Promise<IStorageServer[]> {
        const query: string = names ? `?names=${names}` : '';
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageServer[]> = await axios.get<IStorageServer[]>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }

    /**
     * Get storage information.
     * @param storage The storage name.
     */
    public async getServerByName(storage: string, token?: string): Promise<IStorageServer> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/server/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageServer> = await axios.get<IStorageServer>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }

    /**
     * Get storage config.
     * @param names Filter storage server with names, default name empty will be ignored.
     */
    public async getConfig(names?: string, token?: string): Promise<IStorageConfig[]> {
        const query: string = names ? `?names=${names}` : '';
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config${query}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageConfig[]> = await axios.get<IStorageConfig[]>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }

    /**
     * Get storage config.
     * @param storage The storage name.
     */
    public async getConfigByName(storage: string, token?: string): Promise<IStorageConfig> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storage/config/${storage}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageConfig> = await axios.get<IStorageConfig>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }

    public async getStorages(token?: string): Promise<IStorageSummary> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageSummary> = await axios.get<IStorageSummary>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }

    public async getStorageByName(name: string, token?: string): Promise<IStorageDetail> {
        const url: string = Util.fixUrl(`${this.cluster.rest_server_uri}/api/v2/storages/${name}`, this.cluster.https);
        if (token === undefined) {
            token = await super.token();
        }
        const res: AxiosResponse<IStorageDetail> = await axios.get<IStorageDetail>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return res.data;
    }
}
