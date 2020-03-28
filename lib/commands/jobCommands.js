"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const fs = require("fs-extra");
const util_1 = require("../commom/util");
const utils_1 = require("./utils");
const assert = require("assert");
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
    cli.registerCommand({ name: 'ssh', help: 'ssh to the job container' }, [
        { name: ['--user'], help: 'username on the openpai cluster' },
        { name: ['--login-name', '-l'], help: 'the username to login as on the remote machine', defaultValue: 'root' },
        { name: ['--identity-file', '-i'], help: 'the file to load identity (private key)' },
        { name: 'alias', help: 'cluster alias' },
        { name: 'job', help: 'config file' },
        { name: 'taskrole', help: 'task role', nargs: '?' },
        { name: 'taskindex', help: 'task index', nargs: '?' }
    ], async (a) => {
        const client = cli.manager.getClusterClient(a.alias);
        const jobinfo = await client.job.getFrameworkInfo(a.user || client.config.username(), a.job);
        a.taskrole = a.taskrole || Object.keys(jobinfo.taskRoles)[0];
        a.taskindex = a.taskindex || 0;
        const container = jobinfo.taskRoles[a.taskrole].taskStatuses[a.taskindex];
        assert('ssh' in container.containerPorts, `ssh port is not declared when submitting`);
        const cmd = ['ssh', '-oStrictHostKeyChecking=no'];
        if (a.identity_file) {
            cmd.push('-i', a.identity_file);
        }
        if (a.login_name) {
            cmd.push('-l', a.login_name);
        }
        cmd.push('-p', container.containerPorts['ssh']);
        cmd.push(container.containerIp);
        return (cmd.join(' '));
    });
}
exports.registerJobCommands = registerJobCommands;
