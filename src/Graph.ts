import {IPoint} from "./Point";

export interface IVertexData {
    label?: string,
    position: IPoint
}

export type Graph = number[][];