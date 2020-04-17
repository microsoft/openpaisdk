// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AxiosResponse } from 'axios';

/**
 * The processor for PAI RestAPI response.
 */
export interface IPAIResponseProcessor {
    [statusCode: number]: (res: any) => any;
}

export function processResponse(res: AxiosResponse, processor: IPAIResponseProcessor): any {
    if (res.status in processor) {
        return processor[res.status](res.data);
    } else {
        return JSON.parse(res.data);
    }
}
