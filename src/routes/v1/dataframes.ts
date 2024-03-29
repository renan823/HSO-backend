import express from "express";

const dataframeRouter = express.Router();

dataframeRouter.get("/:filename");

export default dataframeRouter;