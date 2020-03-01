/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
export declare abstract class Identifiable<T, U> {
    protected data: Array<T>;
    protected abstract uidOf(element: T): U;
    protected uidEq(element: T, uid: U): boolean;
    constructor(data?: T[]);
    getData: () => T[];
    copyData(data: T[]): void;
    assignData(data: T[]): void;
    identities(): Array<U>;
    indexOf(uid: U): number;
    find(uid: U): T | undefined;
    add(element: T, denyIfExists?: boolean): void;
    remove(uid: U): void;
}
