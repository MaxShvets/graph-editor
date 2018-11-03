import {InterfacePoint} from "./Geometry";
import {InterfaceGraphicVertexData} from "./UI/GraphicGraph";

export function drawVertex(
    context : CanvasRenderingContext2D,
    vertexID : number,
    {label, position} : InterfaceGraphicVertexData) : void
{
    const {x, y} = position;
    context.fillStyle = "#fff";
    context.lineWidth = 3;

    // draw outer black circle
    const vertexRadius : number = 15;
    context.beginPath();
    context.arc(x, y, vertexRadius, 0, 360);
    context.stroke();
    context.fill();

    // draw label
    context.font = "15px sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(label || vertexID.toString(), x, y);
}

export function drawEdge(context : CanvasRenderingContext2D, from : InterfacePoint, to : InterfacePoint) : void {
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
}