"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
    add(element, denyIfExists = false) {
        const uid = this.uidOf(element);
        if (uid == null) {
            throw new Error('UnIdentifiable');
        }
        const idx = this.indexOf(uid);
        if (denyIfExists && idx > -1) {
            throw new Error(`AlreadyExists: of ${this.uidOf(element)}`);
        }
        if (idx === -1) {
            this.data.push(element);
        }
        else {
            this.data[idx] = element;
        }
    }
    remove(uid) {
        const idx = this.indexOf(uid);
        if (idx > -1) {
            this.data.splice(idx, 1);
        }
    }
    uidEq(element, uid) {
        return this.uidOf(element) === uid;
    }
}
exports.Identifiable = Identifiable;
