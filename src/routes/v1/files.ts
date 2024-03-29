import express from "express";
import FileController from "../../controllers/FileController";
import uploadMiddleware from "../../middlewares/upload";

const fileRouter = express.Router();
const controller = new FileController();

fileRouter.get("/all", uploadMiddleware.single("file"), controller.findAllFiles);

fileRouter.post("/save", controller.saveNewFile);

export default fileRouter;