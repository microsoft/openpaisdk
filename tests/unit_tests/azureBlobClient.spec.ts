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

// tslint:disable-next-line:missing-jsdoc
import * as chai from 'chai';
import { expect } from 'chai';
import * as dirtyChai from 'dirty-chai';
import * as fs from 'fs';
import * as nock from 'nock';
import * as path from 'path';

import { AzureBlobClient, IFileInfo } from '../../src';

const testUri: string = 'openpai-js-sdk.test/rest-server';
let client: AzureBlobClient;

chai.use(dirtyChai);
beforeEach(() => {
    client = new AzureBlobClient(
        {
            mountPoint: '/home',
            path: 'users/\${PAI_USER_NAME}',
            server: 'SRV_AB',
            permission: 'rw'
        },
        {
            spn: 'SRV_AB',
            type: 'azureblob',
            data: {
                dataStore: '',
                containerName: '',
                accountName: '',
                key: '',
                extension: {}
            },
            extension: {}
        }
    );
});

describe('Get status of a path', () => {
    before(() => nock(`http://${testUri}`).get('/api/v1/authn/info').reply(200));

    const filePath: string = 'users/yiyi/folder/natives_blob.bin';
    const folderPath: string = 'users/yiyi/folder';

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should be a file', async () => {
        const res: IFileInfo = await client.getinfo(filePath);
        expect(res.type).to.be.equal('file');
    }).timeout(10000);

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should be a folder', async() => {
        const res: IFileInfo = await client.getinfo(folderPath);
        expect(res.type).to.be.equal('directory');
    }).timeout(10000);
});

describe('List directory of a path', () => {
    const folderPath1: string = 'users/yiyi/folder';
    const folderPath2: string = 'users/yiyi/test';

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list', async () => {
        const res: string[] = await client.listdir(folderPath1);
        expect(res.length).to.be.equal(1);
    }).timeout(10000);

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return an empty list', async() => {
        const res: string[] = await client.listdir(folderPath2);
        expect(res).to.be.empty();
    }).timeout(10000);
});

describe('Create folder and delete', () => {
    const folderPath: string = 'users/yiyi/testFolder';

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should makedir and delete it', async () => {
        await client.makedir(folderPath);
        let list: string[] = await client.listdir(path.dirname(folderPath));

        expect(list).contain(path.basename(folderPath));

        await client.delete(folderPath);
        list = await client.listdir(path.dirname(folderPath));
        expect(list).not.contain(path.basename(folderPath));
    }).timeout(10000);
});

describe('Upload and download', () => {
    const localPath: string = 'E:/Repos/Projects/pai-jobs/test.py';
    const newLocalPath: string = 'E:/Repos/Projects/pai-jobs/new_test.py';
    const filePath: string = 'users/yiyi/test_upload_download.py';

    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should upload a file and download it', async () => {
        const upload: string = fs.readFileSync(localPath, 'utf8');
        await client.upload(localPath, filePath);
        await client.download(filePath, newLocalPath);
        const download: string = fs.readFileSync(newLocalPath, 'utf8');

        expect(download).to.be.eq(upload);
    }).timeout(10000);
});
