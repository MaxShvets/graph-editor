import * as React from "react";
import {AdjacentVertices, Graph, IVertexData, Vertex} from "./Graph";
import {drawEdge, drawVertex} from "./GraphDrawing";
import {IPoint} from "./Point";

interface IGraphCanvasProps {
    graph: Graph,
    verticesData: Map<Vertex, IVertexData>
}

export class GraphCanvas extends React.Component<IGraphCanvasProps, object> {
    private canvasRef = React.createRef<HTMLCanvasElement>();

    public componentDidMount() {
        this.renderGraph(this.props.graph);
    }

    public componentDidUpdate() {
        this.renderGraph(this.props.graph);
    }

    public render() {
        return <canvas ref={this.canvasRef} width={300} height={300}/>
    }

    private renderGraph(graph: Graph): void {
        const verticesData : Map<Vertex, IVertexData> = this.props.verticesData;
        const canvas = this.canvasRef.current!;
        const context : CanvasRenderingContext2D = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw edges of the graph
        graph.forEach((adjacentVertices: AdjacentVertices, vertex: Vertex) => {
            const position : IPoint = verticesData.get(vertex)!.position;

            adjacentVertices.forEach((adjVertex: Vertex) => {
                const adjPosition : IPoint = verticesData.get(adjVertex)!.position;
                drawEdge(context, position, adjPosition);
            })
        });

        // draw vertices after edges so that they appear on top of edges
        graph.forEach((_, vertex: Vertex) => {
            drawVertex(context, vertex, verticesData.get(vertex)!);
        });
    }
}
