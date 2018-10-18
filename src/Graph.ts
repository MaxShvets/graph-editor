import {ImmutableSet, InterfaceImmutableSet} from "./ImmutableSet";
import {IPoint} from "./Point";

export interface IVertexData {
    label?: string,
    position: IPoint
}

export type Vertex = number;
export type AdjacentVertices = InterfaceImmutableSet<Vertex>
export type IVertexForEachCallback = (adjacentVertices: AdjacentVertices, vertex: Vertex) => void
export type IVertexMapCallback<T> = (adjacentVertices: AdjacentVertices, vertex: Vertex) => T

export interface IGraph {
    adjacent(vertex: Vertex): AdjacentVertices;
    forEach(callback: IVertexForEachCallback): void;
    map<T>(callback: IVertexMapCallback<T>): T[];
    addEdge(vertex: Vertex, otherVertex: Vertex): Graph;
    removeEdge(vertex: Vertex, otherVertex: Vertex): Graph;
}

export function createGraph(adjacentVertices: Array<Iterable<number>>) : Graph {
    return new Graph(adjacentVertices);
}

export class Graph implements IGraph {
    private readonly graph: AdjacentVertices[];

    public constructor(graph: Array<Iterable<number>>) {
        this.graph = graph.map((adjacentVertices: Iterable<number>) => {
            return new ImmutableSet(adjacentVertices);
        });
    }

    public adjacent(vertex: Vertex): AdjacentVertices {
        return this.graph[vertex];
    }

    public forEach(callback: IVertexForEachCallback): void {
        this.graph.forEach(callback);
    }

    public map<T>(callback: IVertexMapCallback<T>): T[] {
        return this.graph.map<T>(callback)
    }

    public addEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("add", vertex, otherVertex);
    }

    public removeEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("delete", vertex, otherVertex)
    }

    private performEdgeOperation(operationName: string, vertex: Vertex, otherVertex: Vertex) : Graph {
        const newGraph: AdjacentVertices[] = [...this.graph];
        newGraph[vertex] = this.graph[vertex][operationName](otherVertex);
        newGraph[otherVertex] = this.graph[otherVertex][operationName](vertex);
        return new Graph(newGraph);
    }
}