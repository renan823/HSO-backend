import { NextFunction, Request, Response } from "express";
import ServerException from "../utils/errors/ServerException";
import AuthService from "../services/AuthService";

class AuthMiddleware {

    constructor () {};

    handle (req: Request, res: Response, next: NextFunction) {
        const auth = req.headers.authorization;

        if (!auth) {
            throw new ServerException("Sem autenticação", 401);
        }

        const [, token] = auth.split(" ");

        if (!token) {
            throw new ServerException("Sem autenticação", 401);
        }

        try {
            if (process.env.SECRET_TOKEN) {
                if (new AuthService().verifyToken(token)) {
                    return next();
                }
            } else {
                return next(new ServerException());
            }
        } catch (error: any) {
            throw new ServerException(error.message || "Token inválido", 401);
        }
    }
}

export default AuthMiddleware;