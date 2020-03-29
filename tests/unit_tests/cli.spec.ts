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
import * as mockfs from 'mock-fs';
import { OpenPAIBaseClient } from '../../src/client/baseClient';
import { CliEngine, registerBuiltinCommands } from '../../src/commands';
import { Util } from '../../src/commom/util';
import { fakeRestSrv as F } from '../common/restServer';
import { testJobStatus } from '../common/test_data/testJobStatus';


chai.use(dirtyChai);

beforeEach(async () => {
    const mockDirectory: any = {};
    mockDirectory[Util.expandUser('~/.openpai')] = {
        'clusters.json': JSON.stringify([
            { cluster: OpenPAIBaseClient.parsePaiUri(F.cluster) }
        ])
    };
    mockfs(mockDirectory);
});

interface TestCase {
    name: string;
    command: string[];
    dependencies?: any[];
    checkers: any[];
}

const notEmpty = (result: any) => {
    expect(result).is.not.empty();
};

const testCases = [
    {
        name: 'listc',
        command: ['listc'],
        checkers: [
            notEmpty,
            (r: any) => expect(r[0].alias).is.equal(F.alias)
        ]
    },
    {
        name: 'list all jobs',
        command: ['listj', F.alias, '-a'],
        checkers: [notEmpty],
        dependencies: [F.listJobs]
    },
    {
        name: 'list your own jobs',
        command: ['listj', F.alias],
        checkers: [notEmpty],
        dependencies: [F.listJobsQuery]
    },
    {
        name: 'query job status',
        command: ['getj', F.alias, testJobStatus.name],
        checkers: [
            notEmpty,
            (r: any) => console.dir(r),
            (r: any) => expect(r).to.be.eql(testJobStatus),
        ],
        dependencies: [F.queryJobStatus]
    },
];

for (const tc of testCases) {
    describe(tc.name, async () => {
        for (const d of tc.dependencies || []) {
            before(d);
        }
        it(tc.name, async () => {
            let cli = new CliEngine();
            registerBuiltinCommands(cli);
            await cli.load();

            let result = (await cli.evaluate(tc.command)).result;
            for (const ck of tc.checkers) {
                ck(result);
            }
        });
    });
}

