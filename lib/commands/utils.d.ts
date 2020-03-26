/**
 * utils functions
 */
export declare function readJson<T extends object>(pth: string, val?: T): Promise<T>;
export declare function writeJson<T extends object>(pth: string, val: T): Promise<void>;
export declare function table2Console(rows: any[][]): void;
