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
        this.graph.mergeNode(node);
    }

    addEdge (nodes: string[]) {
        if (nodes[0].trim().length !== 0 && nodes[1].trim().length) {
            nodes = nodes.sort();
            this.graph.mergeEdge(nodes[0], nodes[1]);
        }
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
        //hue for purple-like colors
        return { hue: 270 - ((degree / 100) * 60), saturation: 0.8, value: 1 };
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