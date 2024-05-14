import { NextFunction, Request, Response } from "express";
import ServerException from "../utils/errors/ServerException";

class ErrorMiddleware {

    constructor () {};

    handle (error: ServerException | any, req: Request, res: Response, next: NextFunction) {
        const { status, message } = error as { status: number, message: string };

        return res.status(status).json({ message });
    }   
}

export default ErrorMiddleware;