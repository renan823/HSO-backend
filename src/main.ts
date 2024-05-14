import express from "express";
import cors from "cors";

import ErrorMiddleware from "./middlewares/ErrorMiddleware";
import FileRouter from "./routes/v1/FileRouter";
import DataframeRouter from "./routes/v1/DataframeRouter";
import ThesaurusRouter from "./routes/v1/ThesaurusRouter";
import NetworkRouter from "./routes/v1/NetworkRouter";
import { config } from "dotenv";
import UserRouter from "./routes/v1/UserRouter";

//.env config
config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/files", new FileRouter().handler);
app.use("/api/dataframes", new DataframeRouter().handler);
app.use("/api/thesaurus", new ThesaurusRouter().handler);
app.use("/api/network", new NetworkRouter().handler);
app.use("/api/users", new UserRouter().handler);

app.use(new ErrorMiddleware().handle);

async function main () {
    try {
        app.listen({ port: 5000 });
        console.log("server ready");
    } catch (error: any) {
        process.exit(1);    }
}

main();