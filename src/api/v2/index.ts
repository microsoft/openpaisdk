// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobConfig } from '@protocol/v2';

import {
    AuthnClient,
    JobClient,
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
import { IJobFrameworkInfo, IJobInfo, IJobSshInfo, IJobStatus } from './models/jobStatus';
import { IMountInfo, IStorageConfig, IStorageDetail, IStorageServer, IStorageSummary } from './models/storage';
import { ITokenItem } from './models/token';
import { IUserInfo } from './models/user';
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
    IUserInfo,
    ITokenItem,
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
    StorageNode,
    IGroup,
    GroupClient
};
