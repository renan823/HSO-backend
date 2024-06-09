import { sign, verify } from "jsonwebtoken";
import ServerException from "../utils/errors/ServerException";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

class AuthService {

    constructor () {};

    generateToken (userId: string): string {
        if (!process.env.SECRET_TOKEN) {
            throw new ServerException();
        }

        try {
            return sign({ userId }, process.env.SECRET_TOKEN, { expiresIn: dayjs().add(1, 'minutes').unix() });
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }

    verifyToken (token: string): any {
        if (!process.env.SECRET_TOKEN) {
            throw new ServerException();
        }

        try {
            return verify(token, process.env.SECRET_TOKEN);
        } catch (error: any) {
            throw new ServerException(error.message || "Algo deu errado");
        }
    }

    async generateRefreshToken (userId: string): Promise<string> {
        if (!process.env.SECRET_REFRESH) {
            throw new ServerException();
        }

        const prisma = new PrismaClient();
        try {
            const tokenId = uuid();

            await prisma.user.update({ 
                where: { id: userId },
                data: { tokenId }
            });

            return sign({ userId, tokenId }, process.env.SECRET_REFRESH, { expiresIn: dayjs().add(7, 'days').unix() });
        } catch (error: any) {
            throw new ServerException();
        }
    }

    async verifyRefresh (refresh: string): Promise<{ userId: string, tokenId: string } | null> {
        if (!process.env.SECRET_REFRESH) {
            throw new ServerException();
        }

        const prisma = new PrismaClient();
        try {
            const payload: any = verify(refresh, process.env.SECRET_REFRESH);

            if (!payload.userId || !payload.tokenId) {
                return null;
            }

            const user = await prisma.user.findFirst({ where: { id: payload.userId } });

            if (!user || user.tokenId !== payload.tokenId) {
                return null;
            }

            return { userId: payload.userId, tokenId: payload.tokenId };
        } catch (error: any) {
            throw new ServerException("Erro ao gerar token", 500);
        }
    }

    async removeRefreshToken (refresh: string): Promise<void> {
        if (!process.env.SECRET_REFRESH) {
            throw new ServerException();
        }

        const prisma = new PrismaClient();
        try {
            const payload: any = verify(refresh, process.env.SECRET_REFRESH);

            if (payload.userId) {
                await prisma.user.update({ 
                    where: { id: payload.userId },
                    data: { tokenId: "" }
                });
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