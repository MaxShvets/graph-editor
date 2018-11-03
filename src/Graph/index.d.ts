import {InterfaceImmutableSet} from "../Immutable";

export type VertexID = number;
export type AdjacentVertices = InterfaceImmutableSet<VertexID>;
export type VertexAction<ResultType, VertexData> = (adjacentVertices: AdjacentVertices, vertex: Vertex<VertexData>) => ResultType;

export interface Vertex<VertexData> {
    readonly adjacent: AdjacentVertices;
    readonly data: VertexData
}

export interface InterfaceGraph<VertexData> {
    adjacent(vertexID: VertexID): AdjacentVertices;
    adjacent(vertexID: VertexID, otherVertex: VertexID): boolean;
    addEdge(vertexID: VertexID, otherVertex: VertexID): InterfaceGraph<VertexData>;
    removeEdge(vertexID: VertexID, otherVertex: VertexID): InterfaceGraph<VertexData>;
    addVertex(vertexID: VertexID, vertex: Vertex<VertexData>): InterfaceGraph<VertexData>;
    removeVertex(vertexID: VertexID): InterfaceGraph<VertexData>;
    forEach(callback: VertexAction<void, VertexData>): void;
    map<T>(callback: VertexAction<T, VertexData>): T[];
}