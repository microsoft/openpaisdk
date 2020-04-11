/**
 * OpenPAI v1 job config.
 */
export interface IJobConfig {
    jobName: string;
    image: string;
    dataDir?: string;
    authFile?: string;
    codeDir: string;
    outputDir: string;
    taskRoles: [{
        name: string;
        taskNumber: number;
        cpuNumber: number;
        gpuNumber: number;
        memoryMB: number;
        command: string;
    }];
    [key: string]: any;
}
