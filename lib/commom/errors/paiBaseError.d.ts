import { AxiosError } from 'axios';
/**
 * Base PAI error class.
 */
export declare class PAIBaseError extends Error {
    code: string;
    constructor(error: AxiosError);
}
