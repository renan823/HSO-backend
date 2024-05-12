import { NextFunction, Request, Response } from "express";
import NetworkService from "../services/network/NetworkService";
import { NetworkData } from "../domain/interfaces";
import { SerializedGraph } from "graphology-types";
import ServerException from "../utils/errors/ServerException";
import ThesaurusService from "../services/thesaurus/ThesaurusService";
import Network from "../services/network/Network";

class NetworkController {

    constructor () {};

    async generateNetwork (req: Request, res: Response, next: NextFunction) {
        const networkService = new NetworkService();

        try {
            const { filename } = req.body as { filename: string };
            
            const network: SerializedGraph = await networkService.createNetwork(filename);

            return res.status(201).json({ network });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar a rede"));
        }
    }

    async generateNetworkFromThesaurus (req: Request, res: Response, next: NextFunction) {
        const thesaurusService = new ThesaurusService();

        try {
            const thesaurus = await thesaurusService.getFullThesaurus();

            const network = new Network();

            network.import(thesaurus.generateNetwork());

            network.applyNodePosition();
            network.applyLayout();
            network.applyNodeColor();
            network.applyNodeLabel();
            network.applyNodeSize();
            
            return res.status(201).json({ network: network.export() });
        } catch (error: any) {
            next(new ServerException("Erro ao gerar a rede"));
        }
    }
}

export default NetworkController;