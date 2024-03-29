import express from "express";

import ErrorMiddleware from "./middlewares/ErrorMiddleware";
import FileRouter from "./routes/v1/FileRouter";
import DataframeRouter from "./routes/v1/DataframeRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

app.use("/files", new FileRouter().handler);
app.use("/dataframes", new DataframeRouter().handler);

app.use(new ErrorMiddleware().handle);

async function main () {
    try {
        app.listen({ port: 5000 });
    } catch (error: any) {
        process.exit(1);
    }
}

main();