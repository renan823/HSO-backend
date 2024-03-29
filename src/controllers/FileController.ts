
import { NextFunction, Request, Response } from "express";
import ServerException from "../utils/errors/ServerException";
import FileService from "../services/files/FileService";

class FileController {

    fileService: FileService;

    constructor () {
        this.fileService = new FileService();
    }

    async saveNewFile (req: Request, res: Response, next: NextFunction) {

        if (!req.file) {
            return next(new ServerException("Nenhum arquivo enviado", 400));
        }

        //file already saved by upload middleware
    
        return res.status(201).json({ message: "Arquivo salvo" });
    }

    async findAllFiles (req: Request, res: Response, next: NextFunction) {

        try {
            const files = await this.fileService.listAll();

            return res.status(200).json({ files });
        } catch (error: any) {
            return next(new ServerException());
        }
    }
}

export default FileController;