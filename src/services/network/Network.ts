import { NetworkData } from "../../domain/interfaces";
import Edge from "./Edge";
import Node from "./Node";

class Network {

    private nodes: Map<string, Node>;
    private edges: Map<string, Edge>;

    constructor () {
        this.nodes = new Map<string, Node>;
        this.edges = new Map<string, Edge>;
    }

    private addNode (node: string): void {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, new Node(1, node));
        } else {
            this.nodes.get(node)?.addWeight(0.1);
        }
    }

    private addEdge (from: string, to: string): void {
        let id = [from, to].sort().join("<->");
        if (!this.edges.has(id)) {
            this.edges.set(id, new Edge(from, to, 1));
        } else {
            this.edges.get(id)?.addWeight(0.001);
        }
    }

    fillNetwork (data: NetworkData): void {
        Object.entries(data).forEach(([key, values]) => {
            this.addNode(key);
            let n1 = this.nodes.get(key)?.getId() ?? "";

            values.forEach((value) => {
                this.addNode(value);
                if (key !== value) {
                    let n2 = this.nodes.get(value)?.getId() ?? "";
                    this.addEdge(n1, n2);
                }
            })
        })
    }

    exportNetwork (): any[] {
        let elements: any[] = [];

        this.nodes.forEach((node) => {
            elements.push({ group: "nodes", data: { ...node.toObject() } });
        })

        this.edges.forEach((edge) => {
            console.log(edge.toObject())
            elements.push({ group: "edges", data: { ...edge.toObject() } });
        })

        return elements;
    }
}

export default Network;