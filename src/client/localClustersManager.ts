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

import { IPAICluster } from '../models/cluster';
import { OpenPAIClient } from './openPAIClient';
import { dirname } from 'path';
import * as fs from 'fs-extra';

export class LocalClustersManager {
    public clustersFilePath: string = '~/openpai/clusters.json';
    public clusters: IPAICluster[] = [];

    constructor(pth?: string | undefined, clusters?: IPAICluster[] | undefined) {
        if (pth) {
            this.clustersFilePath = pth;
        }
        if (clusters) {
            this.clusters = clusters;
        }
    }

    public async load(): Promise<void> {
        if (fs.existsSync(this.clustersFilePath)) {
            this.clusters = await fs.readJson(this.clustersFilePath);
        }
    }

    public async store(): Promise<void> {
        let folder: string = dirname(this.clustersFilePath);
        await fs.ensureDir(dirname(this.clustersFilePath));
        await fs.writeJSON(this.clustersFilePath, this.clusters);
    }

}