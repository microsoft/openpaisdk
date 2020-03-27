"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
