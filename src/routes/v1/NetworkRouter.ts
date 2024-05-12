import express from "express";
import NetworkController from "../../controllers/NetworkController";

class NetworkRouter {

    handler: express.Router;
    controller: NetworkController;

    constructor () {
        this.handler = express.Router();
        this.controller = new NetworkController();

        this.setRoutes();
    }

    private setRoutes (): void {
        this.handler.post("/new", this.controller.generateNetwork);

        this.handler.get("/thesaurus", this.controller.generateNetworkFromThesaurus);
    }

}

export default NetworkRouter