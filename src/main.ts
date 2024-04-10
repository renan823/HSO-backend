import express from "express";
import cors from "cors";

import ErrorMiddleware from "./middlewares/ErrorMiddleware";
import FileRouter from "./routes/v1/FileRouter";
import DataframeRouter from "./routes/v1/DataframeRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/files", new FileRouter().handler);
app.use("/api/dataframes", new DataframeRouter().handler);

app.use(new ErrorMiddleware().handle);

async function main () {
    try {
        app.listen({ port: 5000 });
        console.log("server ready");
    } catch (error: any) {
        process.exit(1);    }
}

main();