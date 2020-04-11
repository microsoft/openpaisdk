"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
function processResponse(res, processor) {
    if (res.status in processor) {
        return processor[res.status](res.data);
    }
    else {
        return JSON.parse(res.data);
    }
}
exports.processResponse = processResponse;
