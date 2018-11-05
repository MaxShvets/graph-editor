import {Point} from "../Geometry";
import {InterfaceGraph, Vertex} from "../Graph";

export interface InterfaceGraphicVertexData {
    position: Point,
    label?: string
}

export type GraphicGraphVertex = Vertex<InterfaceGraphicVertexData>
export type GraphicGraph = InterfaceGraph<InterfaceGraphicVertexData>;