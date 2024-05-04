import Graph from "graphology";
import Layout from "./Layout";
import random from "graphology-layout/random";

class RandomLayout implements Layout {
    
    handle(graph: Graph): void {
        random.assign(graph);
    }
}

export default RandomLayout;