import * as React from 'react';
import './App.css';
import {VertexID} from "./Graph";
import {GraphCanvas} from './GraphUI/GraphCanvas';
import {GraphEditor} from "./GraphUI/GraphEditor";
import {GraphicGraph} from "./GraphUI/GraphicGraph";
import {VertexData} from "./GraphUI/VertexData";
import {ImmutableSet} from "./Immutable/Set";

interface InterfaceAppProps {
    graph: GraphicGraph
}

interface InterfaceAppState {
    graph: GraphicGraph,
    currentDisplayedVertex?: VertexID
}

class App extends React.Component<InterfaceAppProps, InterfaceAppState> {
    public constructor(props : InterfaceAppProps) {
        super(props);
        this.state = {
            graph: props.graph
        }
    }

    public render() {
        const currentDisplayedVertex = this.state.currentDisplayedVertex;
        const toggleEdge = this.toggleVertex.bind(this);
        const addVertexHandler = this.addVertexHandler.bind(this);
        const removeVertexHandler = this.removeVertex.bind(this);
        const vertexClickHandler = this.handleVertexClick.bind(this);

        return (
            <div>
                <div>
                    <GraphCanvas
                        graph={this.state.graph} width={300} height={300}
                        vertexClickHandler={vertexClickHandler}/>
                    {
                        currentDisplayedVertex !== undefined &&
                        <VertexData
                            vertexID={currentDisplayedVertex}
                            data={this.state.graph.data(currentDisplayedVertex)}
                            adjacent={this.state.graph.adjacent(currentDisplayedVertex)}/>
                    }
                </div>
                <GraphEditor
                    graph={this.state.graph}
                    toggleEdge={toggleEdge}
                    onAddVertex={addVertexHandler}
                    onRemoveVertex={removeVertexHandler}/>
            </div>
        );
    }

    private removeVertex(vertexID: VertexID): void {
        const newState: InterfaceAppState = {
            graph: this.state.graph.removeVertex(vertexID)
        };

        const currentDisplayedVertex: VertexID | undefined = this.state.currentDisplayedVertex;
        if (currentDisplayedVertex !== undefined && currentDisplayedVertex === vertexID) {
            newState.currentDisplayedVertex = undefined
        }

        this.setState(newState);
    }

    private handleVertexClick(vertexID: VertexID): void {
        this.setState({
            currentDisplayedVertex: vertexID
        })
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
