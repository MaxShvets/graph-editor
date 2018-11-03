import * as React from "react";
import {VertexID} from "./Graph";
import "./GraphEditor.css";
import {GraphicGraph} from "./UI/GraphicGraph";

interface IGraphEditorProps {
    graph: GraphicGraph,
    toggleEdge(vertex: VertexID, otherVertex: VertexID): void;
    onAddVertex(): void;
    onRemoveVertex(vertex: VertexID): void;
}

const nbsp : string = String.fromCharCode(160);
const bullet : string = String.fromCharCode(8226);
const cellClassname: string = "adjacency-indicator";

function cell(className: string, content?: string | number, key?: string | number, onclick?: () => void) : JSX.Element {
    return (
        <div
            className={"cell " + className}
            key={key || className}
            onClick={onclick}>
            {content === undefined ? "" : content}
        </div>
    );
}

export class GraphEditor extends React.Component<IGraphEditorProps, object> {
    public render() {
        const graph : GraphicGraph = this.props.graph;
        const legendUpper : JSX.Element[] = [
            cell("padding"),
            ...graph.map((_, vertex : number) => {
                return cell("legend", vertex, vertex);
            }),
            cell("border-cell")
        ];

        const adjacencyMatrix : JSX.Element[] = graph.map((adjacentVertices, vertex) => {
            const row : JSX.Element[] = graph.map((_, otherVertex : number) => {
                return cell(
                    cellClassname,
                    adjacentVertices.has(otherVertex) ? bullet : nbsp,
                    otherVertex,
                    () => {this.props.toggleEdge(vertex, otherVertex)}
                );
            });

            return (
                <div className={"row row-vertex"} key={vertex}>
                    {[
                        cell("legend", vertex),
                        ...row,
                        cell("minus", "-", undefined, () => this.props.onRemoveVertex(vertex))
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