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

import { AuthnClient } from './client/authnClient';
import { JobClient } from './client/jobClient';
import { OpenPAIClient } from './client/openPAIClient';
import { StorageClient } from './client/storageClient';
import { UserClient } from './client/userClient';
import { VirtualClusterClient } from './client/virtualClusterClient';
import { IAuthnInfo, ILoginInfo } from './models/authn';
import { IPAICluster } from './models/cluster';
import { IJobConfig, IJobFrameworkInfo, IJobInfo, IJobSshInfo } from './models/job';
import { IMountInfo, IStorageConfig, IStorageServer } from './models/storage';
import { ITokenItem } from './models/token';
import { IUserInfo } from './models/user';
import { INodeResource, IVirtualCluster } from './models/virtualCluster';

export {
    OpenPAIClient,
    JobClient,
    UserClient,
    VirtualClusterClient,
    AuthnClient,
    StorageClient,
    IPAICluster,
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
    IMountInfo
};