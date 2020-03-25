"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const fs = require("fs-extra");
const util_1 = require("../commom/util");
const utils_1 = require("./utils");
/**
 * register job realted commands
 */
function registerJobCommands(cli) {
    cli.registerCommand({ name: 'listj', help: 'list jobs', aliases: ['list-jobs'] }, [
        { name: 'alias', help: 'cluster alias' }
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        if (a.all) {
            return client.job.list();
        }
        return client.job.list(`username=${a.user || client.config.username()}`);
    }, [
        {
            args: [
                { name: ['--user', '-u'], help: 'username (default is user in cluster config)' },
                { name: ['--all', '-a'], help: 'list jobs from all users', action: 'storeTrue' }
            ]
        }
    ], (r) => {
        const jobs = r.result;
        const rows = [
            ['name', 'user', 'state', 'VC', '#GPU', '#Task', 'createdTime', 'completedTime']
        ];
        jobs.forEach(job => rows.push([
            job.name, job.username, job.state, job.virtualCluster,
            job.totalGpuNumber, job.totalTaskNumber,
            new Date(job.createdTime).toLocaleString(), new Date(job.completedTime).toLocaleString()
        ]));
        utils_1.table2Console(rows);
    });
    cli.registerCommand({ name: 'subj', help: "submit job" }, [
        { name: 'alias', help: 'cluster alias' },
        { name: 'cfgfile', help: 'config file' }
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        const config = yaml.safeLoad(fs.readFileSync(util_1.Util.expandUser(a.cfgfile), 'utf8'));
        return client.job.submit(config);
    });
    cli.registerCommand({ name: 'getj', help: "get job details", aliases: ['job-info'] }, [
        { name: ['--user'], help: 'username' },
        { name: 'alias', help: 'cluster alias' },
        { name: 'job', help: 'config file' },
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        return client.job.getFrameworkInfo(a.user || client.config.username(), a.job);
    });
}
exports.registerJobCommands = registerJobCommands;
