import {IPoint} from "./Point";

export interface IVertexData {
    label?: string,
    position: IPoint
}

export type Vertex = number;
export type AdjacentVertices = Set<Vertex>
export type IVertexForEachCallback = (adjacentVertices: AdjacentVertices, vertex: Vertex) => void
export type IVertexMapCallback<T> = (adjacentVertices: AdjacentVertices, vertex: Vertex) => T

export interface IGraph {
    adjacent(vertex: Vertex): AdjacentVertices;
    forEach(callback: IVertexForEachCallback): void;
    map<T>(callback: IVertexMapCallback<T>): T[];
    addEdge(vertex: Vertex, otherVertex: Vertex): Graph;
    removeEdge(vertex: Vertex, otherVertex: Vertex): Graph;
}

export function createGraph(adjacentVertices: AdjacentVertices[]) : Graph {
    return new Graph(adjacentVertices);
}

export class Graph implements IGraph {
    private readonly graph: AdjacentVertices[];

    public constructor(graph: AdjacentVertices[]) {
        this.graph = [...graph];
    }

    public adjacent(vertex: Vertex): AdjacentVertices {
        return new Set(this.graph[vertex]);
    }

    public forEach(callback: IVertexForEachCallback): void {
        this.graph.forEach((_, vertex) => callback(this.adjacent(vertex), vertex));
    }

    public map<T>(callback: IVertexMapCallback<T>): T[] {
        return this.graph.map<T>((_, vertex) => callback(this.adjacent(vertex), vertex))
    }

    public addEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("add", vertex, otherVertex);
    }

    public removeEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("delete", vertex, otherVertex)
    }

    private performEdgeOperation(operationName: string, vertex: Vertex, otherVertex: Vertex) : Graph {
        const newGraph: AdjacentVertices[] = [...this.graph];
        const newVertex: AdjacentVertices = new Set(newGraph[vertex]);
        newVertex[operationName](otherVertex);
        newGraph[vertex] = newVertex;
        const newOtherVertex: AdjacentVertices = new Set(newGraph[otherVertex]);
        newOtherVertex[operationName](vertex);
        newGraph[otherVertex] = newOtherVertex;
        return new Graph(newGraph);
    }
}