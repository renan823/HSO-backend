import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import Layout from "./layouts/Layout";

class Network {

    graph: Graph

    constructor () {
        this.graph = new Graph();
    }

    addNode (node: string): void {
        this.graph.addNode(node);
    }

    addEdge (nodes: string[]) {
        nodes = nodes.sort();
        this.graph.addEdge(nodes[0], nodes[1]);
    }

    export (): SerializedGraph {
        return (this.graph.export());
    }

    import (data: SerializedGraph): void {
        this.graph.import(data);
    }

    applyLayout (layout: Layout): void {
        layout.handle(this.graph);
    }

    
 }

export default Network;