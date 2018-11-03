import {InterfaceImmutableMap} from "./index";

export class ImmutableMap<K, V> implements InterfaceImmutableMap<K, V> {
    public readonly size: number;
    private readonly map: Map<K, V>;

    constructor(iterable?: Iterable<[K, V]>) {
        this.map = new Map(iterable || []);
        this.size = this.map.size;
    }

    public set(key: K, value: V): InterfaceImmutableMap<K, V> {
        return this.copyAndUpdate((newMap: Map<K, V>) => {
            newMap.set(key, value);
        });
    }

    public delete(key: K): InterfaceImmutableMap<K, V> {
        return this.copyAndUpdate((newMap: Map<K, V>) => {
            newMap.delete(key);
        });
    }

    public forEach(callback: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void {
        return this.map.forEach(callback, thisArg);
    }

    public get(key: K): V | undefined {
        return this.map.get(key);
    }

    public keys(): IterableIterator<K> {
        return this.map.keys();
    }

    public has(key: K): boolean {
        return this.map.has(key);
    }

    public [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.map[Symbol.iterator]();
    }

    public copyAndUpdate(updateFunction: (map: Map<K, V>) => void): InterfaceImmutableMap<K, V> {
        const newMap: ImmutableMap<K, V> = new ImmutableMap<K, V>(this.map);
        updateFunction(newMap.map);
        return newMap;
    }
}