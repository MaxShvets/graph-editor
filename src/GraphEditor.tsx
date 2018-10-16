import * as React from "react";
import {Graph} from "./Graph";

const nbsp : string = String.fromCharCode(160);
const bullet : string = String.fromCharCode(8226);

function cell(content: string | number, key: string | number, onclick?: () => void) : JSX.Element {
    const contentStr : string = typeof content === "string" ? content : content.toString();
    return (
        <span
            className={"adjacency-indicator"}
            key={key}
            onClick={onclick}>
            {nbsp + contentStr + nbsp}
        </span>
    );
}

interface IGraphEditorProps {
    graph: Graph,
    updateGraph(newGraph: Graph): void;
}

export class GraphEditor extends React.Component<IGraphEditorProps, object> {
    public render() {
        const graph : Graph = this.props.graph;
        const legendUpper : JSX.Element[] = [
            cell(nbsp, "padding"),
            ...graph.map((_, vertex : number) => {
                return cell(vertex, vertex);
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

                return cell(adjacencyIndicator, otherVertex, clickHandler);
            });

            return (
                <div key={vertex}>
                    {[cell(vertex, "legend"), ...row]}
                </div>
            )
        });

        const adjacencyMatrixWithLegend : JSX.Element[] = [
            <div key={"legend-row"}>{legendUpper}</div>,
            ...adjacencyMatrix
        ];

        return <div className={"graph-editor"}>{adjacencyMatrixWithLegend}</div>;
    }
}