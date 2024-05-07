import { SerializedGraph } from "graphology-types";
import Network from "./Network";
import ThesaurusService from "../thesaurus/ThesaurusService";
import RandomLayout from "./layouts/RandomLayout";
import ForceAtlasLayout from "./layouts/ForceAtlasLayout";
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
                dataframe.data.forEach((row: any[]) => {
                    row.forEach((word: string) => {
                        if (word && word.trim().length !== 0) {
                            row.forEach((synonym: string) => {
                                if (synonym && synonym.trim().length !== 0 && synonym !== word) {
                                    console.log(word, synonym)
                                }
                            })
                        }
                    })
                })
                resolve();
            })
        
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
        } catch (error: any) {
            throw new ServerException("Erro ao criar a rede");
        }
    }
}

export default NetworkService;