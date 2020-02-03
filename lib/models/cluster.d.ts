/**
 * OpenPAI cluster.
 */
export interface IPAICluster {
    info?: IPAIClusterInfo;
    username?: string;
    password?: string;
    token?: string;
    https?: boolean;
    rest_server_uri?: string;
    webhdfs_uri?: string;
    grafana_uri?: string;
    hdfs_uri?: string;
    k8s_dashboard_uri?: string;
    web_portal_uri?: string;
    protocol_version?: string;
}
/**
 * OpenPAI cluster info.
 */
export interface IPAIClusterInfo {
    name?: string;
    version?: string;
    launcherType?: 'yarn' | 'k8s';
    authnMethod?: 'basic' | 'OIDC';
}
