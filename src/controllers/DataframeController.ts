import { NextFunction, Request, Response } from "express";
import DataframeService from "../services/dataframe/DataframeService"
import Dataframe from "../services/dataframe/Dataframe";
import ServerException from "../utils/errors/ServerException";

class DataframeController {

    private dataframeService: DataframeService;

    constructor () {
        this.dataframeService = new DataframeService();
    }

    async readDataframe (req: Request, res: Response, next: NextFunction) {
        const filename: string = req.params.filename || "";

        try {
            const dataframe: Dataframe = await this.dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }

    async dropDataframeColumn (req: Request, res: Response, next: NextFunction) {
        const { filename, column } = req.body as { filename: string, column: string };

        try {
            await this.dataframeService.dropColumn(filename, column);

            const dataframe: Dataframe = await this.dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }

    async applyFiltersToDataframe (req: Request, res: Response, next: NextFunction) {
        const { filename, filters } = req.body as { filename: string, filters: string[] };

        try {
            await this.dataframeService.applyFilter(filename, filters);

            const dataframe: Dataframe = await this.dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }
}

export default DataframeController