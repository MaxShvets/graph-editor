export interface IKeyedEntries<K, V> {
    entries(): IterableIterator<[K, V]>
}