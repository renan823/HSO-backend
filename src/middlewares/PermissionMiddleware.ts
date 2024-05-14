import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AuthService from "../services/AuthService";
import ServerException from "../utils/errors/ServerException";

class PermissionMiddleware {

    private roles: string[];
    private readonly prisma: PrismaClient;
    
    constructor (roles: string[]) {
        this.roles = roles;
        this.prisma = new PrismaClient();
    };

    async handle (req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            const [, token] = req.headers.authorization.split(" ");

            if (process.env.SECRET_TOKEN) {
                const { userId } = new AuthService().verifyToken(token);

                if (userId) {
                    const data = await this.prisma.user.findFirst({ where: { id: userId }, select: { role: true } });

                    if (data && data.role && this.roles.includes(data.role)) {
                        return next();
                    } else {
                        throw new ServerException("Permissão necessária", 403);
                    }
                }
                throw new ServerException("Erro na autenticação", 400);
            }
        }
        throw new ServerException();
    }
}

export default PermissionMiddleware;