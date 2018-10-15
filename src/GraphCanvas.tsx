import * as React from "react";
import {Graph, IVertexData} from "./Graph";
import {drawEdge, drawVertex} from "./GraphDrawing";

interface IGraphCanvasProps {
    graph: Graph,
    verticesData: IVertexData[]
}

export class GraphCanvas extends React.Component<IGraphCanvasProps, object> {
    private canvasRef = React.createRef<HTMLCanvasElement>();

    public componentDidMount() {
        const graph = this.props.graph;
        const verticesData = this.props.verticesData;
        const context : CanvasRenderingContext2D = this.canvasRef.current!.getContext("2d")!;

        // draw edges of the graph
        graph.forEach((adjacentVertices : number[], vertex : number) => {
            const position = verticesData[vertex].position;

            adjacentVertices.forEach((adjVertex : number) => {
                const adjPosition = verticesData[adjVertex].position;
                drawEdge(context, position, adjPosition);
            });
        });

        // draw vertices after edges so that they appear on top of edges
        for (let vertex = 0; vertex < graph.length; vertex++) {
            drawVertex(context, vertex, verticesData[vertex]);
        }
    }

    public render() {
        return <canvas ref={this.canvasRef} width={300} height={300}/>
    }
}
