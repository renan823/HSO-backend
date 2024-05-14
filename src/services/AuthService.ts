import { JwtPayload, sign, verify } from "jsonwebtoken";
import ServerException from "../utils/errors/ServerException";
import { PrismaClient } from "@prisma/client";

class AuthService {

    constructor () {};

    generateToken (userId: string): string {
        try {
            if (process.env.SECRET_TOKEN) {
                return sign({ userId }, process.env.SECRET_TOKEN, { expiresIn: '59s' });
            } else {
                throw new ServerException("Erro ao gerar token", 500);
            }
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }

    verifyToken (token: string): JwtPayload {
        if (process.env.SECRET_TOKEN) {
            try {
                return verify(token, process.env.SECRET_TOKEN) as JwtPayload
            } catch (error: any) {
                throw new ServerException(error.message || "Algo deu errado");
            }
        } else {
            throw new ServerException();
        }
    }

    async generateRefreshToken (userId: string): Promise<string> {
        const prisma = new PrismaClient();
        try {
            if (process.env.SECRET_TOKEN) {
                const token = await prisma.refreshToken.create({ data: { userId, expiresIn: 500000 } });

                return "";
            } else {
                throw new ServerException("Erro ao gerar token", 500);
            }
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }
}

export default AuthService;