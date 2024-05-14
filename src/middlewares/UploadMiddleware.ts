import multer, { FileFilterCallback, Multer, StorageEngine } from "multer";
import ServerException from "../utils/errors/ServerException";
import ExtensionValidator from "../utils/validators/ExtensionValidator";
import { Request } from "express";

class UploadMiddleware {

    private url: string = "./uploads";

    constructor () {};

    private storage (): StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./uploads");
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = new Date().toISOString().split(".")[0];
                file.filename = `${uniqueSuffix}.${file.originalname.split(".")[1]}`;
                cb(null, `${uniqueSuffix}.${file.originalname.split(".")[1]}`);
            }
        })
    }

    private fileFilter () {
        return (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            if (new ExtensionValidator().isValid(file.originalname.split(".")[1])) {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new ServerException("Extensão inválida", 415));
            }
        }
    }

    handle (): Multer {
        return multer({ storage: this.storage(), fileFilter: this.fileFilter() });
    }
}

export default UploadMiddleware;