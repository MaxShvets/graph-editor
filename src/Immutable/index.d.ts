export interface InterfaceImmutableSet<T> extends Iterable<T> {
    readonly size: number;
    add(element: T): InterfaceImmutableSet<T>;
    delete(element: T): InterfaceImmutableSet<T>;
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    [Symbol.iterator](): IterableIterator<T>
}

export interface InterfaceImmutableMap<K, V> extends Iterable<[K, V]> {
    readonly size: number;
    set(key: K, value: V): InterfaceImmutableMap<K, V>;
    delete(key: K): InterfaceImmutableMap<K, V>;
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    [Symbol.iterator](): IterableIterator<[K, V]>;
}