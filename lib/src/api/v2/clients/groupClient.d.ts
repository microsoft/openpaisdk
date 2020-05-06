import { IGroup, IPAICluster, IPAIResponse, IUser } from '@api/v2';
import { OpenPAIBaseClient } from './baseClient';
/**
 * OpenPAI group client.
 */
export declare class GroupClient extends OpenPAIBaseClient {
    constructor(cluster: IPAICluster);
    /**
     * Get all group objects in the system.
     */
    getAllGroup(): Promise<IGroup[]>;
    /**
     * Create a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    createGroup(group: IGroup): Promise<IPAIResponse>;
    /**
     * Update a group in the system.
     * @param group The group object { groupname, description, externalName, extension }.
     */
    updateGroup(group: IGroup): Promise<IPAIResponse>;
    /**
     * Get a group in the system.
     * @param groupName The group name.
     */
    getGroup(groupName: string): Promise<IGroup>;
    /**
     * Delete a group in the system.
     * @param groupName The group name.
     */
    deleteGroup(groupName: string): Promise<IPAIResponse>;
    /**
     * Get the user array of a group in the system.
     * @param groupName The group name.
     */
    getGroupMembers(groupName: string): Promise<IUser[]>;
}
