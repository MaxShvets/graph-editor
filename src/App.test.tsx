import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Graph} from "./Graph/Graph";
import {GraphicGraph, InterfaceGraphicVertexData} from "./GraphUI/GraphicGraph";
import {ImmutableSet} from "./Immutable/Set";

const graph : GraphicGraph = new Graph<InterfaceGraphicVertexData>([
    [0, {adjacent: new ImmutableSet([1, 2]), data: {position: {x: 15, y: 125}}}],
    [1, {adjacent: new ImmutableSet([0, 3]), data: {position: {x: 140, y: 34}}}],
    [2, {adjacent: new ImmutableSet([0, 3]), data: {position: {x: 51, y: 220}}}],
    [3, {adjacent: new ImmutableSet([1, 2]), data: {position: {x: 100, y: 100}}}]
]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App graph={graph} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
