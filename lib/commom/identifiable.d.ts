/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
export declare abstract class Identifiable<T, U> {
    protected data: T[];
    constructor(data?: T[]);
    getData: () => T[];
    copyData(data: T[]): void;
    assignData(data: T[]): void;
    identities(): U[];
    indexOf(uid: U): number;
    add(element: T, denyIfExists?: boolean): void;
    remove(uid: U): void;
    protected abstract uidOf(element: T): U;
    protected uidEq(element: T, uid: U): boolean;
}
