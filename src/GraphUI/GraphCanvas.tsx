import * as React from "react";
import {InterfacePoint} from "../Geometry/index";
import {AdjacentVertices, VertexID} from "../Graph/index";
import {drawEdge, drawVertex} from "./GraphDrawing";
import {GraphicGraph} from "./GraphicGraph";

interface IGraphCanvasProps {
    graph: GraphicGraph
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

    private renderGraph(graph: GraphicGraph): void {
        const canvas = this.canvasRef.current!;
        const context : CanvasRenderingContext2D = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw edges of the graph
        graph.forEach((adjacentVertices: AdjacentVertices, vertexID: VertexID) => {
            const position : InterfacePoint = graph.data(vertexID).position;

            adjacentVertices.forEach((adjVertex: VertexID) => {
                const adjPosition : InterfacePoint = graph.data(adjVertex).position;
                drawEdge(context, position, adjPosition);
            })
        });

        // draw vertices after edges so that they appear on top of edges
        graph.forEach((_, vertex: VertexID) => {
            drawVertex(context, vertex, graph.data(vertex));
        });
    }
}
