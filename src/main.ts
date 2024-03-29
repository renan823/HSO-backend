import express from "express";

import fileRouter from "./routes/v1/files";
import ErrorMiddleware from "./middlewares/ErrorMiddleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

app.use("/files", fileRouter);

app.use(new ErrorMiddleware().handle);

async function main () {
    try {
        app.listen({ port: 5000 });
    } catch (error: any) {
        process.exit(1);
    }
}

main();