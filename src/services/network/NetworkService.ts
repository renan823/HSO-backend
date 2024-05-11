import { SerializedGraph } from "graphology-types";
import Network from "./Network";
import ThesaurusService from "../thesaurus/ThesaurusService";
import DataframeService from "../dataframe/DataframeService";
import ServerException from "../../utils/errors/ServerException";

class NetworkService {

    constructor () {};

    async createNetwork (filename: string): Promise<SerializedGraph> {
        const thesaurusService = new ThesaurusService();
        const dataframeService = new DataframeService();

        try {
            const thesaurus = await thesaurusService.getFullThesaurus();
            const network = new Network();
            const dataframe = await dataframeService.readFromFile(filename);

            await dataframe.applyThesaurus(thesaurus);

            await new Promise<void>((resolve) => {
                dataframe.exportRelationSet().forEach((row: Array<any>) => {
                    row.forEach((perm: Array<any>) => {
                        network.addNode(perm[0]);
                        network.addNode(perm[1]);
                        network.addEdge(perm)
                    });
                })

                resolve();
            })

            await new Promise<void>((resolve) => {
                network.applyNodePosition();
                network.applyNodeLabel();
                network.applyNodeSize();
                network.applyNodeColor();

                network.applyLayout();

                resolve();
            })

            console.log("aoba")

            return network.export();
        } catch (error: any) {
            throw new ServerException("Erro ao criar a rede");
        }
    }
}

export default NetworkService;