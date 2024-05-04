import Graph from "graphology";
import { SerializedGraph } from "graphology-types";

class Network {

    graph: Graph

    constructor () {
        this.graph = new Graph();
    }

    addNode (node: string): void {
        this.graph.updateNode(node, (attr) => {
            return { ...attr, weight: (attr.weight || 0) + 1 };
        })
    }

    addEdge (nodes: string[]) {
        nodes = nodes.sort();

        this.graph.updateEdge(nodes[0], nodes[1], (attr) => {
            return { ...attr, weight: (attr.weight || 0) + 1 };
        })
    }

    export (): SerializedGraph {
        return this.graph.export();
    }
}

export default Network;