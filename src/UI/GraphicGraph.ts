import {InterfacePoint} from "../Geometry";
import {InterfaceGraph} from "../Graph";

export interface InterfaceGraphicVertexData {
    position: InterfacePoint,
    label?: string
}

export type GraphicGraph = InterfaceGraph<InterfaceGraphicVertexData>;