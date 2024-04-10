import multer from "multer";
import { Request } from "express";
import ServerException from "../utils/errors/ServerException";
import ExtensionValidator from "../utils/validators/ExtensionValidator";

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, "./uploads");
    },
    filename: (req: Request, file: any, cb) => {
        const uniqueSuffix = new Date().toISOString().split(".")[0];
        file.filename = `${uniqueSuffix}.${file.originalname.split(".")[1]}`;
        cb(null, `${uniqueSuffix}.${file.originalname.split(".")[1]}`);
    }
})

function filter (req: Request, file: any, cb: any) {
    const extension = file.originalname.split(".")[1];
    const validator = new ExtensionValidator();

    if (validator.isValid(extension)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new ServerException("Extensão inválida", 415));
    }
}

const uploadMiddleware = multer({ storage: storage, fileFilter: filter });

export default uploadMiddleware;