import { StorageClient } from './storageClient';
import { StorageNode } from './storageNode';
/**
 * StorageOperation class
 */
export declare class StorageOperation {
    private client;
    constructor(client: StorageClient);
    getStorageNode(name: string, index?: number): Promise<StorageNode>;
}
