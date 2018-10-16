import * as React from 'react';
import './App.css';
import {Graph, IVertexData} from "./Graph";
import {GraphCanvas} from './GraphCanvas';
import {GraphEditor} from "./GraphEditor";

interface IAppProps {
    graph: Graph,
    verticesData: IVertexData[]
}

class App extends React.Component<IAppProps, IAppProps> {
    public constructor(props : IAppProps) {
        super(props);
        this.state = {
            graph: props.graph,
            verticesData: props.verticesData
        }
    }

    public render() {
        const updateGraph = this.updateGraph.bind(this);

        return [
            <GraphCanvas key={"canvas"} graph={this.state.graph} verticesData={this.state.verticesData}/>,
            <GraphEditor
                key={"editor"}
                graph={this.state.graph}
                updateGraph={updateGraph}
            />
        ];
    }

    private updateGraph(newGraph: Graph): void {
        this.setState({graph: newGraph});
    }
}

export default App;
