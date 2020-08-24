// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IJobConfig, IJobInfo, IJobStatus, OpenPAIClient } from '@api/v2';
import { ITaskStatus } from '@pai/api/v2/models/job';
import assert from 'assert';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';

import { Util } from '../commom/util';

import { CliEngine, IResult } from './cliEngine';
import { table2Console } from './utils';
/**
 * register job realted commands
 */
export function registerJobCommands(cli: CliEngine): void {
    cli.registerCommand(
        { name: 'listj', help: 'list jobs', aliases: ['list-jobs'] },
        [
            { name: 'alias', help: 'cluster alias' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            if (a.all) {
                return client.job.listJobs();
            }
            return client.job.listJobs({ username: a.user || client.config.username() });
        },
        [
            {
                args: [
                    { name: ['--user', '-u'], help: 'username (default is user in cluster config)' },
                    { name: ['--all', '-a'], help: 'list jobs from all users', action: 'storeTrue' }
                ]
            }
        ],
        (r: IResult) => {
            const jobs: IJobInfo[] = r.result as IJobInfo[];
            const rows: any[][] = [
                ['name', 'user', 'state', 'VC', '#GPU', '#Task', 'createdTime', 'completedTime']
            ];
            jobs.forEach(job => rows.push([
                job.name, job.username, job.state, job.virtualCluster,
                job.totalGpuNumber, job.totalTaskNumber,
                new Date(job.createdTime).toLocaleString(), new Date(job.completedTime).toLocaleString()
            ]));
            table2Console(rows);
        }
    );

    cli.registerCommand(
        { name: 'subj', help: 'submit job' },
        [
            { name: 'alias', help: 'cluster alias' },
            { name: 'cfgfile', help: 'config file' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            const config: IJobConfig = yaml.safeLoad(fs.readFileSync(Util.expandUser(a.cfgfile), 'utf8'));
            return client.job.createJob(config);
        }
    );

    cli.registerCommand(
        { name: 'getj', help: 'get job details', aliases: ['job-info'] },
        [
            { name: ['--user'], help: 'username' },
            { name: 'alias', help: 'cluster alias' },
            { name: 'job', help: 'config file' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            return client.job.getJob(a.user || client.config.username(), a.job);
        }
    );

    cli.registerCommand(
        { name: 'ssh', help: 'ssh to the job container' },
        [
            { name: ['--user'], help: 'username on the openpai cluster' },
            { name: ['--login-name', '-l'], help: 'the username to login as on the remote machine', defaultValue: 'root' },
            { name: ['--identity-file', '-i'], help: 'the file to load identity (private key)' },
            { name: 'alias', help: 'cluster alias' },
            { name: 'job', help: 'config file' },
            { name: 'taskrole', help: 'task role', nargs: '?' },
            { name: 'taskindex', help: 'task index', nargs: '?' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            const jobinfo: IJobStatus = await client.job.getJob(a.user || client.config.username(), a.job);
            a.taskrole = a.taskrole || Object.keys(jobinfo.taskRoles)[0];
            a.taskindex = a.taskindex || 0;
            const container: ITaskStatus = jobinfo.taskRoles[a.taskrole].taskStatuses[a.taskindex];
            assert('ssh' in container.containerPorts, 'ssh port is not declared when submitting');
            const cmd: (string | number)[] = ['ssh', '-oStrictHostKeyChecking=no'];
            if (a.identity_file) {
                cmd.push('-i', a.identity_file);
            }
            if (a.login_name) {
                cmd.push('-l', a.login_name);
            }
            cmd.push('-p', container.containerPorts.ssh as number);
            cmd.push(container.containerIp);
            return (cmd.join(' '));
        }
    );
}
