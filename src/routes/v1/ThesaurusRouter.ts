import express from "express";
import ThesaurusController from "../../controllers/ThesaurusController";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

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

        this.handler.post("/fill", new AuthMiddleware().handle, this.controller.fillThesaurus);

        this.handler.post("/synonym/add", new AuthMiddleware().handle, this.controller.addSynonym);

        this.handler.post("/synonym/remove", new AuthMiddleware().handle, this.controller.removeSynonym);

        this.handler.post("/word/remove", new AuthMiddleware().handle, this.controller.removeWord);
    }

}

export default ThesaurusRouter;