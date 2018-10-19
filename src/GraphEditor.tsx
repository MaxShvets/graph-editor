import * as React from "react";
import {Graph, Vertex} from "./Graph";
import "./GraphEditor.css";

const nbsp : string = String.fromCharCode(160);
const bullet : string = String.fromCharCode(8226);
const cellClassname: string = "adjacency-indicator";

function cell(content: string | number, className: string, key: string | number, onclick?: () => void) : JSX.Element {
    const contentStr : string = typeof content === "string" ? content : content.toString();
    return (
        <div
            className={"cell " + className}
            key={key}
            onClick={onclick}>
            {contentStr}
        </div>
    );
}

interface IGraphEditorProps {
    graph: Graph,
    updateGraph(newGraph: Graph): void;
    onAddVertex(): void;
    onRemoveVertex(vertex: Vertex): void;
}

export class GraphEditor extends React.Component<IGraphEditorProps, object> {
    public render() {
        const graph : Graph = this.props.graph;
        const legendUpper : JSX.Element[] = [
            cell("", "padding", "padding"),
            ...graph.map((_, vertex : number) => {
                return cell(vertex, "legend", vertex);
            }),
        ];

        const adjacencyMatrix : JSX.Element[] = graph.map((adjacentVertices, vertex) => {
            const row : JSX.Element[] = graph.map((_, otherVertex : number) => {
                let adjacencyIndicator : string;
                let clickHandler : () => void;

                if (adjacentVertices.has(otherVertex)) {
                    adjacencyIndicator = bullet;
                    clickHandler = () => {this.props.updateGraph(graph.removeEdge(vertex, otherVertex))}
                } else {
                    adjacencyIndicator = nbsp;
                    clickHandler = () => {this.props.updateGraph(graph.addEdge(vertex, otherVertex))}
                }

                return cell(adjacencyIndicator, cellClassname, otherVertex, clickHandler);
            });

            return (
                <div className={"row"} key={vertex}>
                    {[
                        cell(vertex, "legend", "legend"),
                        ...row,
                        cell("-", "minus", "minus", () => {this.props.onRemoveVertex(vertex)})
                    ]}
                </div>
            )
        });

        const adjacencyMatrixWithLegend : JSX.Element[] = [
            <div className={"row heading"} key={"legend-row"}>{legendUpper}</div>,
            ...adjacencyMatrix
        ];

        return (
            <div className={"graph-editor"}>
                <div className={"adjacency-matrix"}>{adjacencyMatrixWithLegend}</div>
                <button onClick={this.props.onAddVertex}>Add Vertex</button>
            </div>
        );
    }
}