import * as React from 'react';
import './App.css';
import {VertexID} from "./Graph";
import {GraphCanvas} from './GraphCanvas';
import {GraphEditor} from "./GraphEditor";
import {ImmutableSet} from "./Immutable/Set";
import {GraphicGraph} from "./UI/GraphicGraph";

interface IAppProps {
    graph: GraphicGraph
}

class App extends React.Component<IAppProps, IAppProps> {
    public constructor(props : IAppProps) {
        super(props);
        this.state = {
            graph: props.graph
        }
    }

    public render() {
        const toggleEdge = this.toggleVertex.bind(this);
        const addVertexHandler = this.addVertexHandler.bind(this);
        const removeVertexHandler = this.removeVertex.bind(this);

        return [
            <GraphCanvas key={"canvas"} graph={this.state.graph}/>,
            <GraphEditor
                key={"editor"}
                graph={this.state.graph}
                toggleEdge={toggleEdge}
                onAddVertex={addVertexHandler}
                onRemoveVertex={removeVertexHandler}
            />
        ];
    }

    private removeVertex(vertexID: VertexID): void {
        this.setState({
            graph: this.state.graph.removeVertex(vertexID)
        });
    }

    private toggleVertex(vertex: VertexID, otherVertex: VertexID): void {
        const graph: GraphicGraph = this.state.graph;
        const newGraph: GraphicGraph = graph.adjacent(vertex).has(otherVertex)
            ? graph.removeEdge(vertex, otherVertex)
            : graph.addEdge(vertex, otherVertex);
        this.setState({ graph: newGraph });
    }

    private addVertexHandler() {
        this.setState({
            graph: this.state.graph.addVertex({
                adjacent: new ImmutableSet(),
                data: {position: {x: Math.random()*300, y: Math.random()*300}}
            })
        });
    }
}

export default App;
