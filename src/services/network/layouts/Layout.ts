import Graph from "graphology";

interface Layout {
    handle(graph: Graph): void
}

export default Layout