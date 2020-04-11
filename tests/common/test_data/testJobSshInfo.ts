// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobSshInfo } from '@api/v2';

/**
 * Job SSH info test data.
 */
export const testJobSshInfo: IJobSshInfo = {
    containers: [
        {
            id: 'container_e34_1565337391589_0002_01_000002',
            sshIp: '0.0.0.38',
            sshPort: '34235'
        }
    ],
    keyPair: {
        folderPath: 'hdfs://0.0.0.34:9000/Container/core/core~tensorflow_serving_mnist_2019_6585ba19/ssh/keyFiles',
        publicKeyFileName: 'core~tensorflow_serving_mnist_2019_6585ba19.pub',
        privateKeyFileName: 'core~tensorflow_serving_mnist_2019_6585ba19',
        // tslint:disable-next-line:max-line-length
        privateKeyDirectDownloadLink: 'http://0.0.0.34/a/0.0.0.34:5070/webhdfs/v1/Container/core/core~tensorflow_serving_mnist_2019_6585ba19/ssh/keyFiles/core~tensorflow_serving_mnist_2019_6585ba19?op=OPEN'
    }
};
