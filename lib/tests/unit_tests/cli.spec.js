"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../../src/api/v2");
const commands_1 = require("../../src/commands");
const util_1 = require("../../src/commom/util");
const chai = __importStar(require("chai"));
const chai_1 = require("chai");
const dirty_chai_1 = __importDefault(require("dirty-chai"));
const mock_fs_1 = __importDefault(require("mock-fs"));
const restServer_1 = require("../common/restServer");
const testJobStatus_1 = require("../common/test_data/testJobStatus");
/**
 * Unit tests for cli.
 */
chai.use(dirty_chai_1.default);
beforeEach(async () => {
    const mockDirectory = {};
    mockDirectory[util_1.Util.expandUser('~/.openpai')] = {
        'clusters.json': JSON.stringify([
            { cluster: v2_1.OpenPAIBaseClient.parsePaiUri(restServer_1.fakeRestSrv.cluster) }
        ])
    };
    mock_fs_1.default(mockDirectory);
});
const notEmpty = (result) => {
    chai_1.expect(result).is.not.empty();
};
const testCases = [
    {
        name: 'listc',
        command: ['listc'],
        checkers: [
            notEmpty,
            (r) => chai_1.expect(r[0].alias).is.equal(restServer_1.fakeRestSrv.alias)
        ]
    },
    {
        name: 'list all jobs',
        command: ['listj', restServer_1.fakeRestSrv.alias, '-a'],
        checkers: [notEmpty],
        dependencies: [restServer_1.fakeRestSrv.listJobs]
    },
    {
        name: 'list your own jobs',
        command: ['listj', restServer_1.fakeRestSrv.alias],
        checkers: [notEmpty],
        dependencies: [restServer_1.fakeRestSrv.listJobsQuery]
    },
    {
        name: 'query job status',
        command: ['getj', restServer_1.fakeRestSrv.alias, testJobStatus_1.testJobStatus.name],
        checkers: [
            notEmpty,
            (r) => console.dir(r),
            (r) => chai_1.expect(r).to.be.eql(testJobStatus_1.testJobStatus)
        ],
        dependencies: [restServer_1.fakeRestSrv.queryJobStatus]
    }
];
for (const tc of testCases) {
    describe(tc.name, async () => {
        for (const d of tc.dependencies || []) {
            before(d);
        }
        it(tc.name, async () => {
            const cli = new commands_1.CliEngine();
            commands_1.registerBuiltinCommands(cli);
            await cli.load();
            const result = (await cli.evaluate(tc.command)).result;
            for (const ck of tc.checkers) {
                ck(result);
            }
        });
    });
}
