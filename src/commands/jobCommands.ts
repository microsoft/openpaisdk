// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenPAIClient, IJobConfig, IJobInfo } from '..';
import { CliEngine, IResult } from './cliEngine';
import * as yaml from 'js-yaml';
import * as fs from 'fs-extra';
import { Util } from '../commom/util';
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
                return client.job.list();
            }
            return client.job.list(`username=${a.user || client.config.username()}`);
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
            const jobs = r.result as IJobInfo[];
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
        { name: 'subj', help: "submit job" },
        [
            { name: 'alias', help: 'cluster alias' },
            { name: 'cfgfile', help: 'config file' }
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            const config: IJobConfig = yaml.safeLoad(fs.readFileSync(Util.expandUser(a.cfgfile), 'utf8'));
            return client.job.submit(config);
        }
    );

    cli.registerCommand(
        { name: 'getj', help: "get job details", aliases: ['job-info'] },
        [
            { name: ['--user'], help: 'username' },
            { name: 'alias', help: 'cluster alias' },
            { name: 'job', help: 'config file' },
        ],
        async (a) => {
            const client: OpenPAIClient = cli.manager.getClusterClient(a.alias);
            return client.job.getFrameworkInfo(a.user || client.config.username(), a.job);
        }
    );

}