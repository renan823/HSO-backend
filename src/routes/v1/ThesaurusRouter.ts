import express from "express";
import ThesaurusController from "../../controllers/ThesaurusController";

class ThesaurusRouter {

    handler: express.Router;
    private controller: ThesaurusController;

    constructor () {
        this.handler = express.Router();
        this.controller = new ThesaurusController();

        this.setRoutes();
    }

    private setRoutes (): void {
        this.handler.get("/", this.controller.getThesaurus);

        this.handler.post("/fill", this.controller.fillThesaurus);

        this.handler.post("/synonym/add", this.controller.addSynonym);

        this.handler.post("/synonym/remove", this.controller.removeSynonym);

        this.handler.post("/word/remove", this.controller.removeWord);
    }

}

export default ThesaurusRouter;