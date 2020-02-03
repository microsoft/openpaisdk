import { IPAICluster } from '../models/cluster';
import { IUserInfo } from '../models/user';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI User client.
 */
export declare class UserClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get user information.
     * @param userName The user name.
     * @param token Specific an access token (optional).
     */
    get(userName: string, token?: string): Promise<IUserInfo>;
    /**
     * Get all users.
     * @param token Specific an access token (optional).
     */
    list(token?: string): Promise<IUserInfo[]>;
    /**
     * Create a new user.
     * @param username username in [\w.-]+ format.
     * @param password password at least 6 characters.
     * @param admin true | false.
     * @param email email address or empty string.
     * @param virtualCluster ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"].
     * @param extension { "extension-key1": "extension-value1" }.
     * @param token Specific an access token (optional).
     */
    create(username: string, password: string, admin: boolean, email: string, virtualCluster: string[], extension?: {}, token?: string): Promise<any>;
    /**
     * Update user extension data.
     * @param userName The user name.
     * @param extension The new extension.
     * {
     *   "extension": {
     *      "key-you-wannat-add-or-update-1": "value1",
     *      "key-you-wannat-add-or-update-2": {...},
     *      "key-you-wannat-add-or-update-3": [...]
     * }
     * @param token Specific an access token (optional).
     */
    updateExtension(userName: string, extension: {}, token?: string): Promise<any>;
    /**
     * Delete a user.
     * @param userName The user name.
     * @param token Specific an access token (optional).
     */
    delete(userName: string, token?: string): Promise<any>;
    /**
     * Update user's virtual cluster.
     * @param userName The user name.
     * @param virtualCluster The new virtualCluster.
     * {
     *    "virtualCluster": ["vcname1 in [A-Za-z0-9_]+ format", "vcname2 in [A-Za-z0-9_]+ format"]
     * }
     * @param token Specific an access token (optional).
     */
    updateVirtualcluster(userName: string, virtualCluster: string[], token?: string): Promise<any>;
    /**
     * Update user's password.
     * @param userName The user name.
     * @param oldPassword password at least 6 characters, admin could ignore this params.
     * @param newPassword password at least 6 characters.
     * @param token Specific an access token (optional).
     */
    updatePassword(userName: string, oldPassword?: string, newPassword?: string, token?: string): Promise<any>;
    /**
     * Update user's email.
     * @param userName The user name.
     * @param email The new email.
     * @param token Specific an access token (optional).
     */
    updateEmail(userName: string, email: string, token?: string): Promise<any>;
    /**
     * Update user's admin permission.
     * @param userName The user name.
     * @param admin true | false.
     * @param token Specific an access token (optional).
     */
    updateAdminPermission(userName: string, admin: boolean, token?: string): Promise<any>;
    /**
     * Update user's group list.
     * @param userName The user name.
     * @param grouplist The new group list.
     * @param token Specific an access token (optional).
     */
    updateGroupList(userName: string, grouplist: string[], token?: string): Promise<any>;
    /**
     * Add group into user's group list.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     * @param token Specific an access token (optional).
     */
    addGroup(userName: string, groupname: string, token?: string): Promise<any>;
    /**
     * Remove group from user's group list.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     * @param token Specific an access token (optional).
     */
    removeGroup(userName: string, groupname: string, token?: string): Promise<any>;
    private sendPutRequestWithToken;
}
