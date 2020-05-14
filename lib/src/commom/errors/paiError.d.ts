import { AxiosError } from 'axios';
import { PAIBaseError } from "./paiBaseError";
export declare function paiError(error: AxiosError): PAIBaseError;
