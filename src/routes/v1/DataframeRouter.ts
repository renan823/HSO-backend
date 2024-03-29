import express from "express";

class DataframeRouter {

    handler: express.Router;

    constructor () {
        this.handler = express.Router();

        this.setRoutes();
    }

    private setRoutes (): void {
        this.handler.get("/:filename");
    }
}

export default DataframeRouter;