import { sign, verify } from "jsonwebtoken";
import ServerException from "../utils/errors/ServerException";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

class AuthService {

    constructor () {};

    generateToken (userId: string): string {
        try {
            if (process.env.SECRET_TOKEN) {
                return sign({ userId }, process.env.SECRET_TOKEN, { expiresIn: dayjs().add(30, 'minutes').unix() });
            } else {
                throw new ServerException("Erro ao gerar token", 500);
            }
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }

    verifyToken (token: string): any {
        if (process.env.SECRET_TOKEN) {
            try {
                return verify(token, process.env.SECRET_TOKEN);
            } catch (error: any) {
                throw new ServerException(error.message || "Algo deu errado");
            }
        } else {
            throw new ServerException();
        }
    }

    async generateRefreshToken (userId: string): Promise<{ expiresIn: number, userId: string, id: string }> {
        const prisma = new PrismaClient();
        try {
            await prisma.refreshToken.deleteMany({ where: { userId } });

            const token = await prisma.refreshToken.create({ data: { userId, expiresIn: dayjs().add(24, 'h').unix() } });

            return token;
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }

    async removeRefreshToken (tokenId: string): Promise<void> {
        const prisma = new PrismaClient();
        try {
            const refresh = await prisma.refreshToken.findFirst({ where: { id: tokenId } });

            if (refresh && refresh.userId) {
                await prisma.refreshToken.deleteMany({ where: { userId: refresh.userId } });
            }

        } catch (error: any) {
            throw new ServerException("Erro ao excluir token", 500);
        }
    }

    isTokenExpired (expiresIn: number): boolean {
        return dayjs().isAfter(expiresIn);
    }
}

export default AuthService;