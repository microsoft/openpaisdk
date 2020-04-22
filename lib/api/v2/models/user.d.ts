/**
 * OpenPAI User Info.
 */
export interface IUser {
    username?: string | null;
    password?: string | null;
    grouplist?: string[] | null;
    email?: string | null;
    extension?: any | null;
    admin?: boolean;
    virtualCluster?: string[] | null;
    storageConfig?: any | null;
}
