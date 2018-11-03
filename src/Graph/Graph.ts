import {InterfaceImmutableMap} from "../Immutable";
import {ImmutableMap} from "../Immutable/Map";
import {AdjacentVertices, InterfaceGraph, Vertex, VertexAction, VertexID} from "./index";

type InnerGraphRepresentation<VertexData> = InterfaceImmutableMap<VertexID, Vertex<VertexData>>;
type adjacentVerticesTransformation = (adjacent: AdjacentVertices) => AdjacentVertices;

export class Graph<VertexData> implements InterfaceGraph<VertexData> {
    private graph: InnerGraphRepresentation<VertexData>;

    public constructor(base?: Iterable<[VertexID, Vertex<VertexData>]>) {
        this.graph = new ImmutableMap(base || []);
    }

    public adjacent(vertexID: VertexID): AdjacentVertices;
    public adjacent(vertexID: VertexID, otherVertexID: VertexID): boolean;
    public adjacent(vertexID: VertexID, otherVertexID?: VertexID): boolean | AdjacentVertices {
        this.ensureGraphHasVertices(vertexID);
        const adjacent: AdjacentVertices = this.graph.get(vertexID)!.adjacent;
        return otherVertexID ? adjacent.has(otherVertexID) : adjacent;
    }

    public addEdge(vertexID: VertexID, otherVertexID: VertexID): InterfaceGraph<VertexData> {
        this.ensureGraphHasVertices(vertexID, otherVertexID);
        return this.fromImmutableMap(
            this.graph
                .set(vertexID, this.addAdjacentVertex(vertexID, otherVertexID))
                .set(otherVertexID, this.addAdjacentVertex(otherVertexID, vertexID))
        );
    }

    public removeEdge(vertexID: VertexID, otherVertexID: VertexID): InterfaceGraph<VertexData> {
        this.ensureGraphHasVertices(vertexID, otherVertexID);
        return this.fromImmutableMap(
            this.graph
                .set(vertexID, this.removeAdjacentVertex(vertexID, otherVertexID))
                .set(otherVertexID, this.removeAdjacentVertex(otherVertexID, vertexID))
        );
    }

    public addVertex(vertexID: VertexID, vertex: Vertex<VertexData>): InterfaceGraph<VertexData> {
        this.ensureGraphHasVertices(...vertex.adjacent);
        if (!this.graph.has(vertexID)) {
            return this.fromImmutableMap(this.graph.set(vertexID, vertex));
        } else {
            return this;
        }
    }

    public removeVertex(vertexID: VertexID): InterfaceGraph<VertexData> {
        return this.fromImmutableMap(
            this.graph.copyAndUpdate((newGraph: Map<VertexID, Vertex<VertexData>>) => {
                newGraph.delete(vertexID);
                newGraph.forEach((vertex, otherVertexID) => {
                    newGraph.set(otherVertexID, this.removeAdjacentVertex(otherVertexID, vertexID));
                });
            })
        );
    }

    public forEach(callback: VertexAction<void, VertexData>): void {
        this.graph.forEach((vertex: Vertex<VertexData>) => {
            callback(vertex.adjacent, vertex);
        });
    }

    public map<T>(callback: VertexAction<T, VertexData>): T[] {
        const result: T[] = [];
        this.graph.forEach((vertex: Vertex<VertexData>) => {
            result.push(callback(vertex.adjacent, vertex));
        });
        return result;
    }

    private removeAdjacentVertex(vertexID: VertexID, otherVertexID: VertexID): Vertex<VertexData> {
        return this.changeAdjacentVertices(vertexID, adjacent => adjacent.delete(otherVertexID));
    }

    private addAdjacentVertex(vertexID: VertexID, otherVertexID: VertexID): Vertex<VertexData> {
        return this.changeAdjacentVertices(vertexID, adjacent => adjacent.add(otherVertexID));
    }

    private changeAdjacentVertices(id: VertexID, transformation: adjacentVerticesTransformation): Vertex<VertexData> {
        const vertex: Vertex<VertexData> = this.graph.get(id)!;
        return {
            adjacent: transformation(vertex.adjacent),
            data: vertex.data
        };
    }

    private fromImmutableMap(map: InnerGraphRepresentation<VertexData>): InterfaceGraph<VertexData> {
        const newGraph: Graph<VertexData> = new Graph();
        newGraph.graph = map;
        return newGraph;
    }

    private ensureGraphHasVertices(...vertices: VertexID[]): void {
        vertices.forEach(vertex => {
            if (!this.graph.has(vertex)) {
                throw new RangeError(`Graph has no vertex with ID ${vertex}`);
            }
        });
    }
}