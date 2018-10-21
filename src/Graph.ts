import {IKeyedEntries} from "./IKeyedEntries";
import {InterfaceImmutableSet} from "./Immutable";
import {ImmutableSet} from "./Immutable/Set";
import {IPoint} from "./Point";

export interface IVertexData {
    label?: string,
    position: IPoint
}

export type Vertex = number;
export type AdjacentVertices = InterfaceImmutableSet<Vertex>;
export type IVertexForEachCallback = (adjacentVertices: AdjacentVertices, vertex: Vertex) => void;
export type IVertexMapCallback<T> = (adjacentVertices: AdjacentVertices, vertex: Vertex) => T;
type InternalGraph = Map<Vertex, AdjacentVertices>;
type GraphBase = IKeyedEntries<Vertex, Iterable<Vertex>>


export interface IGraph {
    adjacent(vertex: Vertex): AdjacentVertices;
    forEach(callback: IVertexForEachCallback): void;
    map<T>(callback: IVertexMapCallback<T>): T[];
    addEdge(vertex: Vertex, otherVertex: Vertex): Graph;
    removeEdge(vertex: Vertex, otherVertex: Vertex): Graph;
    addVertex(): Graph;
    removeVertex(vertex: Vertex): Graph
}

export function createGraph(adjacentVertices: GraphBase) : Graph {
    return new Graph(adjacentVertices);
}

export class Graph implements IGraph {
    private readonly graph: InternalGraph;

    public constructor(base?: GraphBase) {
        this.graph = new Map<Vertex, AdjacentVertices>();

        if (base) {
            for (const [vertex, adjacentVertices] of base.entries()) {
                this.graph.set(vertex, new ImmutableSet(adjacentVertices))
            }
        }
    }

    public adjacent(vertex: Vertex): AdjacentVertices {
        this.validateVertices(vertex);
        return this.graph.get(vertex)!;
    }

    public forEach(callback: IVertexForEachCallback): void {
        this.graph.forEach(callback);
    }

    public map<T>(callback: IVertexMapCallback<T>): T[] {
        const result = [];

        for (const [vertex, adjacentVertices] of this.graph) {
            result.push(callback(adjacentVertices, vertex));
        }

        return result;
    }

    public addEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("add", vertex, otherVertex);
    }

    public removeEdge(vertex: Vertex, otherVertex: Vertex): Graph {
        return this.performEdgeOperation("delete", vertex, otherVertex)
    }

    public addVertex(): Graph {
        const newVertex = this.getNewVertex();
        this.graph.set(newVertex, new ImmutableSet());
        const newGraph: Graph = new Graph(this.graph);
        this.graph.delete(newVertex);
        return newGraph;
    }

    public removeVertex(vertex: Vertex): Graph {
        this.validateVertices(vertex);
        const newGraph: InternalGraph = new Map(this.graph);
        newGraph.delete(vertex);
        newGraph.forEach((adjacent: AdjacentVertices, otherVertex: Vertex) => {
            newGraph.set(otherVertex, adjacent.delete(vertex))
        });
        return new Graph(newGraph);
    }

    private getNewVertex(): Vertex {
        let newVertex: number = 0;

        this.graph.forEach((_, vertex: Vertex) => {
            newVertex = newVertex < vertex ? vertex : newVertex;
        });

        return newVertex + 1;
    }

    private performEdgeOperation(operationName: string, vertex: Vertex, otherVertex: Vertex) : Graph {
        this.validateVertices(vertex, otherVertex);
        const newGraph: InternalGraph = new Map(this.graph);
        newGraph.set(vertex, this.graph.get(vertex)![operationName](otherVertex));
        newGraph.set(otherVertex, this.graph.get(otherVertex)![operationName](vertex));
        return new Graph(newGraph);
    }

    private validateVertices(...vertices: Vertex[]): void {
        vertices.forEach((vertex) => {
            if (!this.graph.has(vertex)) {
                throw new RangeError(`Vertex ${vertex} is missing in graph ${this}`);
            }
        });
    }
}