"use strict";
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
class Identifiable {
    constructor(data) {
        this.data = [];
        this.getData = () => this.data;
        if (data) {
            this.data = data;
        }
    }
    uidEq(element, uid) {
        return this.uidOf(element) == uid;
    }
    copyData(data) {
        this.data = JSON.parse(JSON.stringify(data));
    }
    assignData(data) {
        Object.assign(this.data, data);
    }
    identities() {
        return this.data.map((a) => {
            return this.uidOf(a);
        });
    }
    indexOf(uid) {
        return this.identities().indexOf(uid);
    }
    find(uid) {
        let idx = this.indexOf(uid);
        if (idx > -1) {
            return this.data[idx];
        }
        return undefined;
    }
    add(element, denyIfExists = false) {
        const uid = this.uidOf(element);
        if (uid == null) {
            throw new Error(`UnIdentifiable`);
        }
        const idx = this.indexOf(uid);
        if (denyIfExists && idx > -1) {
            throw new Error(`AlreadyExists: of ${this.uidOf(element)}`);
        }
        if (idx == -1) {
            this.data.push(element);
        }
        else {
            this.data[idx] = element;
        }
    }
    remove(uid) {
        let idx = this.indexOf(uid);
        if (idx > -1) {
            this.data.splice(idx, 1);
        }
    }
}
exports.Identifiable = Identifiable;
