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

import { IStorageNode, IFileInfo } from '../models/storageOperation'

export class baseStorageNode implements IStorageNode {
    getinfo(path: string): Promise<IFileInfo> {
        throw new Error("Method not implemented.");
    }
    listdir(path: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    makedir(path: string, mode?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    upload(localPath: string, remotePath: string, opts?: {} | undefined): void {
        throw new Error("Method not implemented.");
    }
    download(remotePath: string, localPath: string, opts?: {} | undefined): void {
        throw new Error("Method not implemented.");
    }
    delete(path: string): void {
        throw new Error("Method not implemented.");
    }
    existsSync(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    isdirSync(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    uploadFolder(localPath: string, remotePath: string, opts?: {} | undefined): void {
        throw new Error("Method not implemented.");
    }
    downloadFolder(remotePath: string, localPath: string, opts?: {} | undefined): void {
        throw new Error("Method not implemented.");
    }

}