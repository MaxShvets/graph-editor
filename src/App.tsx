import * as React from 'react';
import './App.css';
import {Graph, IVertexData} from "./Graph";
import {GraphCanvas} from './GraphCanvas';
import {GraphEditor} from "./GraphEditor";
import {IPoint} from "./Point";

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
        const addVertexHandler = this.addVertexHandler.bind(this);

        return [
            <GraphCanvas key={"canvas"} graph={this.state.graph} verticesData={this.state.verticesData}/>,
            <GraphEditor
                key={"editor"}
                graph={this.state.graph}
                updateGraph={updateGraph}
                onAddVertex={addVertexHandler}
            />
        ];
    }

    private updateGraph(newGraph: Graph): void {
        this.setState({graph: newGraph});
    }

    private addVertexHandler() {
        const newVertexPos: IPoint = {x: 0, y: 0};

        // find maximal coordinates for present vertices
        this.state.verticesData.forEach(({position}: IVertexData) => {
            if (newVertexPos.x < position.x) {
                newVertexPos.x = position.x;
            }

            if (newVertexPos.y < position.y) {
                newVertexPos.y = position.y;
            }
        });

        // randomly choose a place for new vertex
        const regionTrial: number = Math.random();
        if (regionTrial < 0.33) {
            // place vertex to the north-west of existing vertices
            newVertexPos.x += Math.random() * 50;
            newVertexPos.y += Math.random() * 50;
        } else if (regionTrial < 0.66) {
            // place vertex to the west of existing vertices
            newVertexPos.x += Math.random() * 50;
            newVertexPos.y = Math.random() * newVertexPos.y;
        } else {
            // place vertex to the north of existing vertices
            newVertexPos.x = Math.random() * newVertexPos.x;
            newVertexPos.y += Math.random() * 50;
        }

        this.setState({
            graph: this.state.graph.addVertex(),
            verticesData: [...this.state.verticesData, {position: newVertexPos}]
        });
    }
}

export default App;
