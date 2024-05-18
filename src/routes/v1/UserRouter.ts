import express from "express";
import UserController from "../../controllers/UserController";

class UserRouter {

    handler: express.Router;
    private controller: UserController

    constructor () {
        this.handler = express.Router();
        this.controller = new UserController();

        this.setRoutes();
    };

    private setRoutes (): void {
        this.handler.post("/new", this.controller.createUser);

        this.handler.post("/auth/login", this.controller.authenticateUser);

        this.handler.post("/auth/refresh", this.controller.refreshUserToken);
    }
}

export default UserRouter;