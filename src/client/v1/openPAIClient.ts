// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IPAICluster } from '../../models/cluster';

import { AuthnClient } from './authnClient';
import { OpenPAIBaseClient } from './baseClient';
import { JobClient } from './jobClient';

/**
 * OpenPAI Client.
 */
export class OpenPAIClient extends OpenPAIBaseClient {
    /**
     * OpenPAI Job Client.
     */
    public job: JobClient;

    /**
     * OpenPAI Authn Client.
     */
    public authn: AuthnClient;

    constructor(cluster: IPAICluster) {
        super(cluster);
        this.job = new JobClient(cluster);
        this.authn = new AuthnClient(cluster);
    }
}
