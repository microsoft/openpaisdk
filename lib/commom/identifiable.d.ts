/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
export declare class Identifiable<T, U> {
    data: Array<T>;
    uidOf: (element: T) => U;
    uidEq: (element: T, uid: U) => boolean;
    constructor(funcGetUid: (element: T) => U, data?: T[]);
    identities(): Array<U>;
    indexOf(uid: U): number;
    find(uid: U): T | undefined;
    add(element: T): void;
    remove(uid: U): void;
}
