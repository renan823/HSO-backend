import { SerializedGraph } from "graphology-types";
import Network from "./Network";
import ThesaurusService from "../thesaurus/ThesaurusService";
import RandomLayout from "./layouts/RandomLayout";
import ForceAtlasLayout from "./layouts/ForceAtlasLayout";

class NetworkService {

    constructor () {};

    async createNetwork (): Promise<SerializedGraph> {
        const thesaurusService = new ThesaurusService();

        const thesaurus = await thesaurusService.getFullThesaurus();
        
        const network = new Network();

        await new Promise<void>((resolve) => {
            network.import(thesaurus.generateNetwork());

            network.applyNodePosition();
            network.applyNodeLabel();
            network.applyNodeSize();
            network.applyNodeColor();

            network.applyLayout(new ForceAtlasLayout());

            resolve();
        })

        return network.export();
    }
}

export default NetworkService;