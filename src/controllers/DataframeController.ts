import { NextFunction, Request, Response } from "express";
import DataframeService from "../services/dataframe/DataframeService"

class DataframeController {

    private dataframeService: DataframeService;

    constructor () {
        this.dataframeService = new DataframeService();
    }

    async readDataframe (req: Request, res: Response, next: NextFunction) {
        const filename: string = req.params.filename || "";

        
    }
}

export default DataframeController