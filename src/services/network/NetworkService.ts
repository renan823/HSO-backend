import { SerializedGraph } from "graphology-types";
import Network from "./Network";
import ThesaurusService from "../thesaurus/ThesaurusService";
import RandomLayout from "./layouts/RandomLayout";

class NetworkService {

    constructor () {};

    async createNetwork (data: any): Promise<SerializedGraph> {
        const thesaurusService = new ThesaurusService();

        const thesaurus = await thesaurusService.getFullThesaurus();
        
        const network = new Network();

        network.import(thesaurus.generateNetwork());

        network.applyLayout(new RandomLayout());

        return network.export();
    }
}

export default NetworkService;