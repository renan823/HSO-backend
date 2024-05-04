import { NextFunction, Request, Response } from "express";
import NetworkService from "../services/network/NetworkService";
import { NetworkData } from "../domain/interfaces";
import { SerializedGraph } from "graphology-types";

class NetworkController {

    constructor () {};

    async generateNetwork (req: Request, res: Response, next: NextFunction) {
        const networkService = new NetworkService();

        const network: SerializedGraph = await networkService.createNetwork();

        return res.status(201).json({ network });
    }
}

export default NetworkController;