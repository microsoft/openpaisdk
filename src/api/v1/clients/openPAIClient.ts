// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthnClient, JobClient } from '@api/v1/clients';
import { IPAICluster } from '@api/v2';

import { OpenPAIBaseClient } from './baseClient';

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
