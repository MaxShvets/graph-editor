import * as React from 'react';
import './App.css';
import {Graph} from "./Graph";
import {GraphCanvas} from './GraphCanvas';

const graph : Graph = [[1, 2], [0, 3], [0, 3], [1, 2]];
const verticesData = [
    {position: {x: 15, y: 125}},
    {position: {x: 140, y: 34}},
    {position: {x: 51, y: 220}},
    {position: {x: 100, y: 100}}
];

class App extends React.Component {
  public render() {
    return <GraphCanvas graph={graph} verticesData={verticesData}/>;
  }
}

export default App;
