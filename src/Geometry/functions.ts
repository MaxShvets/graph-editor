import {Point} from "./index";

export function distance({x: x1, y: y1}: Point, {x: x2, y: y2}: Point): number {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}