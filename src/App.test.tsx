import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {createGraph, Graph} from "./Graph";

const graph : Graph = createGraph([[1, 2], [0, 3], [0, 3], [1, 2]]);
const verticesData = [
    {position: {x: 15, y: 125}},
    {position: {x: 140, y: 34}},
    {position: {x: 51, y: 220}},
    {position: {x: 100, y: 100}}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App graph={graph} verticesData={verticesData} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
