"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolV1 = __importStar(require("./v1"));
exports.ProtocolV1 = ProtocolV1;
const ProtocolV2 = __importStar(require("./v2"));
exports.ProtocolV2 = ProtocolV2;
