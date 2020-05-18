// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenPAIBaseClient } from '@api/v2';
import { registerBuiltinCommands, CliEngine } from '@pai/commands';
import { Util } from '@pai/commom/util';
import * as chai from 'chai';
import { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import mockFs from 'mock-fs';

import { fakeRestSrv as F } from '../common/restServer';
import { testJobStatus } from '../common/test_data/testJobStatus';

/**
 * Unit tests for cli.
 */
chai.use(dirtyChai);

beforeEach(async () => {
    const mockDirectory: any = {};
    mockDirectory[Util.expandUser('~/.openpai')] = {
        'clusters.json': JSON.stringify([
            { cluster: OpenPAIBaseClient.parsePaiUri(F.cluster) }
        ])
    };
    mockFs(mockDirectory);
});

interface ITestCase {
    name: string;
    command: string[];
    dependencies?: any[];
    checkers: any[];
}

const notEmpty = (result: any) => {
    expect(result).is.not.empty();
};

const testCases: ITestCase[] = [
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
            (r: any) => expect(r).to.be.eql(testJobStatus)
        ],
        dependencies: [F.queryJobStatus]
    }
];

for (const tc of testCases) {
    describe(tc.name, async () => {
        for (const d of tc.dependencies || []) {
            before(d);
        }
        it(tc.name, async () => {
            const cli: CliEngine = new CliEngine();
            registerBuiltinCommands(cli);
            await cli.load();

            const result: any = (await cli.evaluate(tc.command)).result;
            for (const ck of tc.checkers) {
                ck(result);
            }
        });
    });
}
