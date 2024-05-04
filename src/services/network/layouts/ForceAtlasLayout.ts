import Graph from "graphology";
import Layout from "./Layout";
import RandomLayout from "./RandomLayout";
import forceAtlas2 from "graphology-layout-forceatlas2";

class ForceAtlasLayout implements Layout {

    handle(graph: Graph): void {
        new RandomLayout().handle(graph);

        const iterations = 600;

        forceAtlas2.assign(graph, iterations);
    }
}

export default ForceAtlasLayout;