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


/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
export abstract class Identifiable<T, U> {
    protected data: Array<T> = [];
    protected abstract uidOf(element: T): U;

    protected uidEq(element: T, uid: U): boolean {
        return this.uidOf(element) == uid;
    }

    constructor(data?: T[]) {
        if (data) {
            this.data = data;
        }
    }

    public getData = () => this.data;
    public copyData(data: T[]) {
        this.data = JSON.parse(JSON.stringify(data));
    }
    public assignData(data: T[]) {
        Object.assign(this.data, data);
    }

    public identities(): Array<U> {
        return this.data.map((a) => {
            return this.uidOf(a);
        });
    }

    public indexOf(uid: U): number {
        return this.identities().indexOf(uid);
    }

    public find(uid: U): T | undefined {
        let idx = this.indexOf(uid);
        if (idx > -1) {
            return this.data[idx];
        }
        return undefined;
    }

    public add(element: T, denyIfExists: boolean = false): void {
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
        } else {
            this.data[idx] = element;
        }
    }

    public remove(uid: U): void {
        let idx = this.indexOf(uid);
        if (idx > -1) {
            this.data.splice(idx, 1);
        }
    }
}
