"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@pai/storage");
const chai = require("chai");
const chai_1 = require("chai");
const dirtyChai = require("dirty-chai");
const fs = require("fs");
const mockFs = require("mock-fs");
const nock = require("nock");
const os = require("os");
const path = require("path");
const testStorages_1 = require("../common/test_data/testStorages");
/**
 * Unit tests for azureBlobClient.
 */
const testUri = 'openpai-js-sdk.test/rest-server';
let client;
chai.use(dirtyChai);
beforeEach(() => {
    client = new storage_1.AzureBlobClient(testStorages_1.testAzureBlobInfoShareKey.data);
});
describe('Get status of a path', () => {
    const filePath = '.tests/folder/test_blob.txt';
    const folderPath = '.tests/folder';
    const response = '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults>' +
        '<Blobs><Blob><Name>.tests/folder/test_blob.txt</Name></Blob></Blobs><NextMarker />' +
        '</EnumerationResults>';
    before(() => {
        nock(`http://${testUri}`).get('/api/v2/authn/info').reply(200);
        nock('https://accountname.blob.core.windows.net')
            .head('/containerName/.tests%2Ffolder%2Ftest_blob.txt')
            .reply(200)
            .head('/containerName/.tests%2Ffolder')
            .reply(404, '', { 'x-ms-error-code': 'BlobNotFound' })
            .get('/containerName?prefix=.tests%2Ffolder%2F&delimiter=%2F&maxresults=1&include=metadata&restype=container&comp=list')
            .reply(200, response, { 'Content-Type': 'application/xml' });
    });
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should be a file', async () => {
        const res = await client.getinfo(filePath);
        chai_1.expect(res.type).to.be.equal('file');
    }).timeout(10000);
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should be a folder', async () => {
        const res = await client.getinfo(folderPath);
        chai_1.expect(res.type).to.be.equal('directory');
    }).timeout(10000);
});
describe('List directory of a path', () => {
    const folderPath1 = '.tests/folder';
    const folderPath2 = '.tests/test';
    const response = '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults>' +
        '<Blobs><Blob><Name>.tests/folder/test_blob.txt</Name></Blob></Blobs><NextMarker />' +
        '</EnumerationResults>';
    const empty = '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults>' +
        '<Blobs /><NextMarker />' +
        '</EnumerationResults>';
    before(() => {
        nock('https://accountname.blob.core.windows.net')
            .get('/containerName?prefix=.tests%2Ffolder%2F&delimiter=%2F&maxresults=20&include=metadata&restype=container&comp=list')
            .reply(200, response, { 'Content-Type': 'application/xml' })
            .get('/containerName?prefix=.tests%2Ftest%2F&delimiter=%2F&maxresults=20&include=metadata&restype=container&comp=list')
            .reply(200, empty, { 'Content-Type': 'application/xml' });
    });
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return a list', async () => {
        const res = await client.listdir(folderPath1);
        chai_1.expect(res.length).to.be.equal(1);
    }).timeout(10000);
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should return an empty list', async () => {
        const res = await client.listdir(folderPath2);
        chai_1.expect(res).to.be.empty();
    }).timeout(10000);
});
describe('Create folder and delete', () => {
    const response = '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults>' +
        '<Blobs><Blob><Name>.tests/testFolder</Name></Blob></Blobs><NextMarker />' +
        '</EnumerationResults>';
    const empty = '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults>' +
        '<Blobs /><NextMarker />' +
        '</EnumerationResults>';
    before(() => {
        nock('https://accountname.blob.core.windows.net')
            .put('/containerName/.tests%2FtestFolder')
            .reply(201)
            .get('/containerName?prefix=.tests%2F&delimiter=%2F&maxresults=20&include=metadata&restype=container&comp=list')
            .reply(200, response, { 'Content-Type': 'application/xml' });
    });
    const folderPath = '.tests/testFolder';
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should makedir and delete it', async () => {
        await client.makedir(folderPath);
        let list = await client.listdir(path.dirname(folderPath));
        chai_1.expect(list).contain(path.basename(folderPath));
        nock('https://accountname.blob.core.windows.net')
            .delete('/containerName/.tests%2FtestFolder')
            .reply(202)
            .get('/containerName?prefix=.tests%2F&delimiter=%2F&maxresults=20&include=metadata&restype=container&comp=list')
            .reply(200, empty, { 'Content-Type': 'application/xml' });
        await client.delete(folderPath);
        list = await client.listdir(path.dirname(folderPath));
        chai_1.expect(list).not.contain(path.basename(folderPath));
    }).timeout(10000);
});
describe('Upload and download', () => {
    let localPath;
    let newLocalPath;
    const filePath = '.tests/test_upload_download.py';
    before(() => {
        localPath = path.join(os.tmpdir(), './.test/test.py');
        newLocalPath = path.join(os.tmpdir(), './.test/new_test.py');
        nock('https://accountname.blob.core.windows.net')
            .put('/containerName/.tests%2Ftest_upload_download.py')
            .reply(201)
            .get('/containerName/.tests%2Ftest_upload_download.py')
            .reply(200, 'test content', {
            'Content-Type': 'application/octet-stream',
            'Content-Length': ['12'],
            ETag: '0x8D7B9FC84AD5D1F'
        });
    });
    // tslint:disable-next-line:mocha-no-side-effect-code
    it('should upload a file and download it', async () => {
        const mockDirectory = {};
        mockDirectory[localPath] = 'test content';
        mockFs(mockDirectory);
        const upload = fs.readFileSync(localPath, 'utf8');
        await client.upload(localPath, filePath);
        await client.download(filePath, newLocalPath);
        const download = fs.readFileSync(newLocalPath, 'utf8');
        chai_1.expect(download).to.be.eq(upload);
    }).timeout(10000);
    after(() => mockFs.restore());
});
