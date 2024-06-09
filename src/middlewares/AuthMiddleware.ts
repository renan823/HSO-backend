import { NextFunction, Request, Response } from "express";
import ServerException from "../utils/errors/ServerException";
import AuthService from "../services/AuthService";

class AuthMiddleware {

    constructor () {};

    handle (req: Request, res: Response, next: NextFunction) {
        const auth = req.headers.authorization;

        if (!auth) {
            return next(new ServerException("Sem autenticação", 401));
        }

        const [, token] = auth.split(" ");

        if (!token) {
            return next(new ServerException("Sem autenticação", 401));
        }

        try {
            if (new AuthService().verifyToken(token)) {
                return next();
            }

            return next(new ServerException());
        } catch (error: any) {
            return next (new ServerException(error.message || "Token inválido", 401));
        }
    }
}

export default AuthMiddleware;