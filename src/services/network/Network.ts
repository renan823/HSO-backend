import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import Layout from "./layouts/Layout";
import Color from "../../utils/Color";

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

    degrees (): number[] {
        return this.graph.mapNodes(node => this.graph.degree(node));
    }

    degreeToHSV (degree: number) {
        //hue esta na faixa do roxo
        return { hue: 270 - ((degree / 100) * 60), saturation: 0.5, value: 1 };
    }

    applyLayout (layout: Layout): void {
        layout.handle(this.graph);
    }

    applyNodePosition (): void {
        this.graph.forEachNode(node => {
            this.graph.setNodeAttribute(node, "x", 0);
            this.graph.setNodeAttribute(node, "y", 0);
        })
    }

    applyNodeLabel (): void {
        this.graph.forEachNode(node => this.graph.setNodeAttribute(node, "label", node));
    }

    applyNodeSize (): void {
        const size = { min: 3, max: 30 };
        const degree = { min: Math.min(...this.degrees()), max: Math.max(...this.degrees()) };

        this.graph.forEachNode(node => {
            const nodeDegree = this.graph.degree(node);

            this.graph.setNodeAttribute(node, "size", size.min + ((nodeDegree - degree.min) / (degree.max - degree.min)) * (size.max - size.min));
        })
    }

    applyNodeColor (): void {
        this.graph.forEachNode(node => {
            const nodeDegree = this.graph.degree(node);
            
            const { hue, saturation, value } = this.degreeToHSV(nodeDegree)

            this.graph.setNodeAttribute(node, "color", Color.hsvToHex(hue, saturation, value));
        })
    }
 }

export default Network;