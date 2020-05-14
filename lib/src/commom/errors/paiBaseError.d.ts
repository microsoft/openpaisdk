import { AxiosError } from 'axios';
/**
 * Base PAI error class.
 */
export declare class PAIBaseError extends Error {
    status: number;
    data: any;
    constructor(error: AxiosError);
}
