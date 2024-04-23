import { NextFunction, Request, Response } from "express";
import NetworkService from "../services/network/NetworkService";
import { NetworkData } from "../domain/interfaces";

class NetworkController {

    constructor () {};

    async generateNetwork (req: Request, res: Response, next: NextFunction) {
        const networkService = new NetworkService();

        const { data } = req.body as { data: NetworkData };

        const network: any[] = await networkService.createNetwork(data);

        return res.status(201).json({ network });
    }
}

export default NetworkController;