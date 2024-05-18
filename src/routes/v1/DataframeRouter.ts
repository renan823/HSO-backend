import express from "express";
import DataframeController from "../../controllers/DataframeController";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

class DataframeRouter {

    handler: express.Router;
    private controller: DataframeController;

    constructor () {
        this.handler = express.Router();
        this.controller = new DataframeController();

        this.setRoutes();
    }

    private setRoutes (): void {
        this.handler.get("/:filename", this.controller.readDataframe);

        this.handler.post("/alter/drop", new AuthMiddleware().handle, this.controller.dropDataframeColumn);

        this.handler.post("/alter/filter", new AuthMiddleware().handle, this.controller.applyFiltersToDataframe);

        this.handler.post("/alter/replace", new AuthMiddleware().handle, this.controller.replaceDataframeWords);
    }
}

export default DataframeRouter;