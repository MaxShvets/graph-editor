import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {createGraph, Graph} from "./Graph";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const graph : Graph = createGraph([
    new Set([1, 2]), new Set([0, 3]), new Set([0, 3]), new Set([1, 2]), new Set([0, 2, 3])
]);
const verticesData = [
    {position: {x: 15, y: 125}},
    {position: {x: 140, y: 34}},
    {position: {x: 51, y: 220}},
    {position: {x: 100, y: 100}},
    {position: {x: 200, y: 120}}
];

ReactDOM.render(
  <App graph={graph} verticesData={verticesData} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
