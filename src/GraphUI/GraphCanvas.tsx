import * as React from "react";
import {Point} from "../Geometry";
import {distance} from "../Geometry/functions";
import {AdjacentVertices, VertexID} from "../Graph";
import {drawEdge, drawVertex} from "./GraphDrawing";
import {GraphicGraph} from "./GraphicGraph";

interface IGraphCanvasProps {
    graph: GraphicGraph,
    vertexClickHandler: (vertexID: VertexID) => void,
    width: number,
    height: number
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
        const handleClick = this.handleClick.bind(this);

        return (
            <canvas
                ref={this.canvasRef}
                width={this.props.width}
                height={this.props.height}
                onClick={handleClick}
            />
        );
    }

    private handleClick(event: React.MouseEvent<HTMLCanvasElement>): void {
        const graph: GraphicGraph = this.props.graph;
        const canvasRect: ClientRect = event.currentTarget.getBoundingClientRect();
        const clickPoint: Point = {
            x: event.clientX - canvasRect.left,
            y: event.clientY - canvasRect.top
        };

        graph.forEach((_, vertexID) => {
            if (distance(clickPoint, graph.data(vertexID).position) < 18) {
                this.props.vertexClickHandler(vertexID);
            }
        });
    }

    private renderGraph(graph: GraphicGraph): void {
        const canvas = this.canvasRef.current!;
        const context : CanvasRenderingContext2D = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw edges of the graph
        graph.forEach((adjacentVertices: AdjacentVertices, vertexID: VertexID) => {
            const position : Point = graph.data(vertexID).position;

            adjacentVertices.forEach((adjVertex: VertexID) => {
                const adjPosition : Point = graph.data(adjVertex).position;
                drawEdge(context, position, adjPosition);
            })
        });

        // draw vertices after edges so that they appear on top of edges
        graph.forEach((_, vertex: VertexID) => {
            drawVertex(context, vertex, graph.data(vertex));
        });
    }
}
