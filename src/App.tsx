import * as React from 'react';
import './App.css';
import {Graph, IVertexData, Vertex} from "./Graph";
import {GraphCanvas} from './GraphCanvas';
import {GraphEditor} from "./GraphEditor";
import {IKeyedEntries} from "./IKeyedEntries";
import {IPoint} from "./Point";

interface IAppProps {
    graph: Graph,
    verticesData: IKeyedEntries<Vertex, IVertexData>
}

interface IAppState {
    graph: Graph,
    verticesData: Map<Vertex, IVertexData>
}

class App extends React.Component<IAppProps, IAppState> {
    public constructor(props : IAppProps) {
        super(props);
        this.state = {
            graph: props.graph,
            verticesData: new Map(props.verticesData.entries())
        }
    }

    public render() {
        const toggleEdge = this.toggleVertex.bind(this);
        const addVertexHandler = this.addVertexHandler.bind(this);
        const removeVertexHandler = this.removeVertexHandler.bind(this);

        return [
            <GraphCanvas key={"canvas"} graph={this.state.graph} verticesData={this.state.verticesData}/>,
            <GraphEditor
                key={"editor"}
                graph={this.state.graph}
                toggleEdge={toggleEdge}
                onAddVertex={addVertexHandler}
                onRemoveVertex={removeVertexHandler}
            />
        ];
    }

    private toggleVertex(vertex: Vertex, otherVertex: Vertex): void {
        const graph: Graph = this.state.graph;
        const newGraph: Graph = graph.adjacent(vertex).has(otherVertex)
            ? graph.removeEdge(vertex, otherVertex)
            : graph.addEdge(vertex, otherVertex);
        this.setState({ graph: newGraph });
    }

    private removeVertexHandler(vertex: Vertex) {
        const verticesDataCopy: Map<Vertex, IVertexData> = new Map(this.state.verticesData);
        verticesDataCopy.delete(vertex);
        this.setState({
            graph: this.state.graph.removeVertex(vertex),
            verticesData: verticesDataCopy
        });
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

        const verticesDataCopy: Map<Vertex, IVertexData> = new Map(this.state.verticesData);
        const newVertex: Vertex = Math.max(...verticesDataCopy.keys()) + 1;
        verticesDataCopy.set(newVertex, {position: newVertexPos});

        this.setState({
            graph: this.state.graph.addVertex(),
            verticesData: verticesDataCopy
        });
    }
}

export default App;
