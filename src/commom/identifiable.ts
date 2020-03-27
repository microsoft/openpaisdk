// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * the container for identifiable objects(:T) with unique ID (:U)
 */
export abstract class Identifiable<T, U> {
    protected data: T[] = [];

    constructor(data?: T[]) {
        if (data) {
            this.data = data;
        }
    }

    public getData = () => this.data;

    public copyData(data: T[]): void {
        this.data = JSON.parse(JSON.stringify(data));
    }

    public assignData(data: T[]): void {
        Object.assign(this.data, data);
    }

    public identities(): U[] {
        return this.data.map((a) => {
            return this.uidOf(a);
        });
    }

    public indexOf(uid: U): number {
        return this.identities().indexOf(uid);
    }

    public add(element: T, denyIfExists: boolean = false): void {
        const uid: U = this.uidOf(element);
        if (uid == null) {
            throw new Error(`UnIdentifiable`);
        }
        const idx: number = this.indexOf(uid);
        if (denyIfExists && idx > -1) {
            throw new Error(`AlreadyExists: of ${this.uidOf(element)}`);
        }
        if (idx === -1) {
            this.data.push(element);
        } else {
            this.data[idx] = element;
        }
    }

    public remove(uid: U): void {
        const idx: number = this.indexOf(uid);
        if (idx > -1) {
            this.data.splice(idx, 1);
        }
    }
    protected abstract uidOf(element: T): U;

    protected uidEq(element: T, uid: U): boolean {
        return this.uidOf(element) === uid;
    }
}
