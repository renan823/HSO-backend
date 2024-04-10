import { NextFunction, Request, Response } from "express";
import DataframeService from "../services/dataframe/DataframeService"
import Dataframe from "../services/dataframe/Dataframe";
import ServerException from "../utils/errors/ServerException";

class DataframeController {

    constructor () {};

    async readDataframe (req: Request, res: Response, next: NextFunction) {
        const dataframeService: DataframeService = new DataframeService();
        
        const filename: string = req.params.filename || "";

        try {
            const dataframe: Dataframe = await dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }

    async dropDataframeColumn (req: Request, res: Response, next: NextFunction) {
        const dataframeService: DataframeService = new DataframeService();

        const { filename, column } = req.body as { filename: string, column: string };

        try {
            await dataframeService.dropColumn(filename, column);

            const dataframe: Dataframe = await dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }

    async applyFiltersToDataframe (req: Request, res: Response, next: NextFunction) {
        const dataframeService: DataframeService = new DataframeService();

        const { filename, filters } = req.body as { filename: string, filters: string[] };

        try {
            await dataframeService.applyFilter(filename, filters);

            const dataframe: Dataframe = await dataframeService.readFromFile(filename);

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }

    async replaceDataframeWords (req: Request, res: Response, next: NextFunction) {
        const dataframeService: DataframeService = new DataframeService();

        const { filename, words, substitutes } = req.body as { filename: string, words: string[], substitutes: string[] };

        try {
            await dataframeService.replaceWords(filename, words, substitutes);

            const dataframe: Dataframe = await dataframeService.readFromFile(filename);

            console.log(dataframe.head(10));

            return res.status(200).json({ dataframe: dataframe.sample(10) });
        } catch (error: any) {
            return next(new ServerException());
        }
    }
}

export default DataframeController