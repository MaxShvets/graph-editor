import * as React from 'react';
import {Point} from "../Geometry";
import {AdjacentVertices, VertexID} from "../Graph";
import {InterfaceGraphicVertexData} from "./GraphicGraph";

interface InterfaceVertexInfoProps {
    vertexID: VertexID,
    data: InterfaceGraphicVertexData,
    adjacent: AdjacentVertices
}

export class VertexData extends React.Component<InterfaceVertexInfoProps, object> {
    public render() {
        const position: Point = this.props.data .position;
        const adjacent: AdjacentVertices = this.props.adjacent;

        return (
            <div>
                <b>{`Vertex ${this.props.vertexID}`}</b><br/>
                <b>Position:</b> ({position.x}, {position.y})<br/>
                <b>Adjacent: </b>{Array.from(adjacent).join(" ")}
            </div>
        );
    }
}