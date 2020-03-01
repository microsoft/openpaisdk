import { Identifiable } from '../commom/identifiable';
export declare function readJson<T extends object>(pth: string, val?: T): Promise<T>;
export declare function writeJson<T extends object>(pth: string, val: T): Promise<void>;
export declare abstract class PersistentObjects<T, U> extends Identifiable<T, U> {
    protected filename: string;
    constructor(filename: string, data?: T[]);
    load(): Promise<void>;
    store(): Promise<void>;
}
