import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/interfaces";
import ServerException from "../../utils/errors/ServerException";

class UserService {

    constructor () {};

    async create (user: User): Promise<User> {
        const prisma = new PrismaClient();

        try {
            const newUser = await prisma.user.create({ data: { name: user.name, email: user.email, password: user.password, role: user.role } });

            return newUser;
        } catch (error: any) {
            console.log(error)
            throw new ServerException(error.message || "Erro ao criar usuário", error.status || 500);
        }
    }
}