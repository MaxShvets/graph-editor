import {InterfaceImmutableSet} from "./index";

export class ImmutableSet<T> implements InterfaceImmutableSet<T> {
    public readonly size: number;
    private readonly set: Set<T>;

    constructor(iterable?: Iterable<T>) {
        this.set = new Set<T>(iterable || []);
        this.size = this.set.size;
    }

    public has(element: T): boolean {
        return this.set.has(element);
    }

    public add(element: T): ImmutableSet<T> {
        return this.copy((newSet: Set<T>) => {
            newSet.add(element);
        });
    }

    public delete(element: T): ImmutableSet<T> {
        return this.copy((newSet: Set<T>) => {
            newSet.delete(element);
        });
    }

    public forEach(callback: (value: T, otherValue: T, set: Set<T>) => void, thisArg?: any): void {
        this.set.forEach(callback, thisArg);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.set[Symbol.iterator]();
    }

    private copy(transform: (set: Set<T>) => void): ImmutableSet<T> {
        const newImmutableSet: ImmutableSet<T> = new ImmutableSet<T>(this.set);
        transform(newImmutableSet.set);
        return newImmutableSet;
    }
}