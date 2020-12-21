// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenPAI Job Info.
 */
export interface IJobInfo {
    name: string;
    username: string;
    state: 'WAITING' | 'RUNNING' | 'SUCCEEDED' | 'STOPPED' | 'FAILED' | 'UNKNOWN';
    /** raw frameworkState from frameworklauncher */
    subState: 'FRAMEWORK_COMPLETED' | 'FRAMEWORK_WAITING';
    executionType: 'START' | 'STOP';
    retries: number;
    retryDetails: {
        /** Job failed due to user or unknown error. */
        user: number,
        /** Job failed due to platform error. */
        platform: number,
        /** Job cannot get required resource to run within timeout. */
        resource: number;
    };
    createdTime: number;
    completedTime: number;
    virtualCluster: string;
    appExitCode: number;
    totalGpuNumber: number;
    totalTaskNumber: number;
    totalTaskRoleNumber: number;
}

/**
 * Query object for list job, filter jobs by username, vc, state and keyword. Set offset, limit, order and withTotalCount.
 * e.g.
 * {
 *    username: 'user1,user2',
 *    vc: 'vc1,vc2',
 *    state: 'RUNNING,WAITING,STOPPED',
 *    keyword: 'mnist',
 *    offset: 0,
 *    order: 'submissionTime,DESC',
 *    withTotalCount: false
 * }
 */
export interface IJobListQeury {
    username?: string;
    vc?: string;
    state?: string;
    keyword?: string;
    offset?: number;
    limit?: number;
    order?: string; // format <field>,<ASC|DESC>, default value is "submissionTime,DESC"
    withTotalCount?: boolean;
}

export interface ITaskLogInfo {
    locations: {
        name: string;
        uri: string;
    }[];
}

export interface IEventListQuery {
    type?: 'Warning' | 'Normal';
}

export interface IAppExitSpec {
    code: number;
    phrase: string;
    issuer: string;
    causer: string;
    type: string;
    stage: string;
    behavior: string;
    reaction: string;
    repro: string[];
}

export interface IJobStatusDetails {
    username: string;
    state: 'WAITING' | 'RUNNING' | 'SUCCEEDED' | 'STOPPED' | 'FAILED' | 'UNKNOWN';
    subState: string;
    executionType: 'START' | 'STOP';
    retries: number;
    retryDetails: {
        user?: number;
        platform?: number;
        resource?: number;
    };
    retryDelayTime?: any;
    createdTime: number;
    completedTime: number | null;
    attemptId: number | null;
    attemptState: string | null;
    appId: string;
    appProgress: number;
    appTrackingUrl: string;
    appCreatedTime: number | null;
    appLaunchedTime: number | null;
    appCompletedTime: number | null;
    appExitCode: number | null;
    appExitSpec: IAppExitSpec | null;
    appExitDiagnostics: string | null;
    appExitMessages: {
        container?: string | null;
        runtime?: string | null;
        launcher?: string | null;
    } | null;
    appExitTriggerMessage: string | null;
    appExitTriggerTaskRoleName: string | null;
    appExitTriggerTaskIndex: number | null;
    appExitType: string | null;
    virtualCluster: string | null;
}

export interface ITaskStatus {
    taskIndex: number;
    taskUid: string;
    taskState: string;
    retries: number;
    accountableRetries: number;
    createdTime: number | null;
    completedTime: number | null;
    attemptId: number | null;
    attemptState: string | null;
    containerId: string;
    containerIp: string;
    containerPorts: { [index: string]: number | number[] | string; };
    containerGpus?: any;
    containerLog: string;
    containerExitCode: number | null;
    hived?: {
        affinityGroupName?: any;
        lazyPreempted?: any;
        lazyPreemptionStatus?: any;
    };
}

/**
 * OpenPAI Job status.
 */
export interface IJobStatus {
    name: string;
    jobStatus: IJobStatusDetails;
    taskRoles: {
        [index: string]: {
            taskRoleStatus: {
                name: string;
            };
            taskStatuses: ITaskStatus[];
        };
    };
}

interface ITaskAttempt {
    attemptId: number;
    attemptState: string;
    currentAttemptCreatedTime: number | null;
    currentAttemptLaunchedTime: number | null;
    currentAttemptCompletedTime: number | null;
    containerId: string | null;
    containerIp: string | null;
    containerNodeName: string | null;
    containerPorts: object;
    containerGpus?: any;
    containerLog: string;
    containerExitCode: number | null;
    containerExitSpec: {
        code: number;
        phrase: string;
        issuer: string;
        causer: string;
        type: string;
        stage: string;
        behavior: string;
        reaction: string;
        reason: string;
        repro: string[];
        solution?: string[];
    } ;
    containerExitDiagnostics: string | null;
    hived?: {
        affinityGroupName?: any;
        lazyPreempted?: any;
        lazyPreemptionStatus?: any;
    };
}

/**
 * OpenPAI Task Detail.
 */
export interface ITaskDetail {
    taskIndex: number;
    taskUid: string;
    taskState: string;
    retries: number;
    accountableRetries: number;
    createdTime: number | null;
    completedTime: number | null;
    username: string;
    jobName: string;
    jobAttemptId: number;
    taskRoleName: string;
    attempts: ITaskAttempt[];
}

/**
 * OpenPAI Job Framework Infomation.
 */
export interface IJobFrameworkInfo {
    summarizedFrameworkInfo?: any | null;
    aggregatedFrameworkRequest?: any | null;
    aggregatedFrameworkStatus?: any | null;
}

/**
 * OpenPAI Job SSH Information.
 */
export interface IJobSshInfo {
    containers?: any | null;
    keyPair?: any | null;
}

export interface IJobAttempt {
    jobName?: string;
    frameworkName?: string;
    uid?: string;
    userName?: string;
    state?: string;
    originState?: string;
    maxAttemptCount?: number;
    attemptIndex?: number;
    jobStartedTime?: number;
    attemptStartedTime?: number;
    attemptCompletedTime?: number;
    exitCode?: number;
    exitPhrase?: string;
    exitType?: string;
    exitDiagnostics?: {
        diagnosticsSummary?: string;
        runtime?: {
            exitCode?: number;
            originUserExitCode?: number;
            errorLogs?: {
                user?: string;
                platform?: string;
            };
            name?: string;
        };
        launcher?: string;
    };
    appExitTriggerMessage?: string;
    appExitTriggerTaskRoleName?: string;
    appExitTriggerTaskIndex?: number;
    appExitSpec: {
        code?: number;
        phrase?: string;
        issuer?: string;
        causer?: string;
        type?: string;
        stage?: string;
        behavior?: string;
        reaction?: string;
        reason?: string;
        repro?: string[];
        solution?: string[];
    };
    appExitDiagnostics?: string;
    appExitMessages?: {
        container?: string;
        runtime?: {
            exitCode?: number;
            originUserExitCode?: number;
            errorLogs?: {
                user?: string;
                platform?: string;
            };
            name?: string;
        };
        launcher?: string;
    };
    totalGpuNumber?: number;
    totalTasknumber?: number;
    totalTaskRoleNumber?: number;
    taskRoles?: {
        taskrole?: {
            taskRoleStatus: {
                name?: string;
            };
            taskStatuses?: {
                taskIndex?: number;
                taskState?: string;
                containerId?: string;
                containerIp?: string;
                containerGpus?: string;
                containerLog?: string;
                containerExitCode?: number;
            }[];
        };
    };
    isLatest?: boolean;
}
