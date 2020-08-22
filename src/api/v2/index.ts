// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobConfig } from '@protocol/v2';

import {
    ApiClient,
    AuthnClient,
    JobClient,
    JobHistoryClient,
    KubernetesClient,
    OpenPAIBaseClient,
    OpenPAIClient,
    StorageClient,
    UserClient,
    VirtualClusterClient
} from './clients';
import { GroupClient } from './clients/groupClient';
import { StorageNodeV2 as StorageNode } from './clients/storageClient';
import { IAuthnInfo, ILoginInfo } from './models/authn';
import { IPAICluster, IPAIClusterInfo } from './models/cluster';
import { IGroup } from './models/group';
import { IJobAttempt, IJobFrameworkInfo, IJobInfo, IJobListQeury, IJobSshInfo, IJobStatus } from './models/job';
import { IPAIResponse } from './models/paiResponse';
import { IMountInfo, IStorageConfig, IStorageDetail, IStorageServer, IStorageSummary } from './models/storage';
import { IToken, ITokenList } from './models/token';
import { IUpdateUserProfile, IUser } from './models/user';
import { INodeResource, IVirtualCluster } from './models/virtualCluster';

/**
 * Export OpenPAI RestAPI V1.
 */
export {
    AuthnClient,
    JobClient,
    OpenPAIClient,
    OpenPAIBaseClient,
    StorageClient,
    UserClient,
    VirtualClusterClient,
    IPAICluster,
    IPAIClusterInfo,
    IJobConfig,
    IJobInfo,
    IJobFrameworkInfo,
    IJobSshInfo,
    IJobAttempt,
    IUser,
    IUpdateUserProfile,
    IToken,
    ITokenList,
    IVirtualCluster,
    INodeResource,
    IAuthnInfo,
    ILoginInfo,
    IStorageServer,
    IStorageConfig,
    IStorageSummary,
    IStorageDetail,
    IMountInfo,
    IJobStatus,
    IJobListQeury,
    StorageNode,
    IGroup,
    GroupClient,
    ApiClient,
    JobHistoryClient,
    IPAIResponse,
    KubernetesClient
};
