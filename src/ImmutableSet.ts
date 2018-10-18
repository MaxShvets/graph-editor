export interface InterfaceImmutableSet<T> extends Iterable<T> {
    readonly size: number;
    has(element: T): boolean;
    add(element: T): ImmutableSet<T>;
    delete(element: T): ImmutableSet<T>;
    forEach(callback: (value: T, otherValue: T, set: Set<T>) => void, thisArg?: any): void;
    [Symbol.iterator](): Iterator<T>
}

export class ImmutableSet<T> implements Iterable<T>{
    public readonly size: number;
    private readonly set: Set<T>;

    constructor(iterable: Iterable<T>) {
        this.set = new Set(iterable);
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
        })
    }

    public forEach(callback: (value: T, otherValue: T, set: Set<T>) => void, thisArg?: any): void {
        this.set.forEach(callback, thisArg);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.set[Symbol.iterator]();
    }

    private copy(transform: (set: Set<T>) => void): ImmutableSet<T> {
        const copy: Set<T> = new Set<T>(this.set);
        transform(copy);
        return new ImmutableSet(copy);
    }
}