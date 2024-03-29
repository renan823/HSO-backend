import express from "express";
import DataframeController from "../../controllers/DataframeController";

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

        this.handler.post("/alter/drop", this.controller.dropDataframeColumn);

        this.handler.post("/alter/filter",this.controller.applyFiltersToDataframe);
    }
}

export default DataframeRouter;