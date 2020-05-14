import { IPAICluster, IPAIResponse, IUpdateUserProfile, IUser } from "..";
import { OpenPAIBaseClient } from "./baseClient";
/**
 * OpenPAI User client.
 */
export declare class UserClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Create a user in the system.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    createUser(user: IUser): Promise<IPAIResponse>;
    /**
     * Get all users in the system by admin.
     */
    getAllUser(): Promise<IUser[]>;
    /**
     * Update a user in the system. Admin only.
     * @param user The user info: { username, email, password, admin, virtualCluster, extension }.
     */
    updateUser(user: IUser, patch?: boolean): Promise<IPAIResponse>;
    /**
     * Update user's own profile in the system.
     * @param username The user name.
     * @param email The new email address, optional.
     * @param newPassword The new password, optional.
     * @param oldPassword The old password, optional.
     */
    updateUserSelf(user: IUpdateUserProfile, patch?: boolean): Promise<IPAIResponse>;
    /**
     * Get a user's data.
     * @param userName The user's name.
     */
    getUser(userName: string): Promise<IUser>;
    /**
     * Remove a user in the system.
     * Basic mode only.
     * Admin only.
     * @param userName The user's name.
     */
    deleteUser(userName: string): Promise<IPAIResponse>;
    /**
     * Add a group to a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The new groupname in [A-Za-z0-9_]+ format.
     */
    updateUserGroup(userName: string, groupname: string): Promise<IPAIResponse>;
    /**
     * Remove a group from user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param groupname The groupname in [A-Za-z0-9_]+ format.
     */
    deleteUserGroup(userName: string, groupname: string): Promise<IPAIResponse>;
    /**
     * Update a user's grouplist.
     * Basic mode only.
     * Admin only.
     * @param userName The user name.
     * @param grouplist The new group list.
     */
    updateUserGrouplist(userName: string, grouplist: string[]): Promise<IPAIResponse>;
}
