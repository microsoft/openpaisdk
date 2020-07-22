// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * OpenPAI cluster.
 */
export interface IPAICluster {
    info?: IPAIClusterInfo;
    alias?: string;
    username?: string;
    password?: string;
    token?: string;
    https?: boolean;
    pai_uri?: string;
    rest_server_uri?: string;
    grafana_uri?: string;
    k8s_dashboard_uri?: string;
    web_portal_uri?: string;
    protocol_version?: string;
    request_timeout?: number;
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
