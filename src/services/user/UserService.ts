import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/interfaces";
import ServerException from "../../utils/errors/ServerException";
import { compareSync, hashSync } from "bcryptjs";
import AuthService from "../AuthService";

interface AuthenticateUserReturn {
    token: string, 
    refresh: { expiresIn: number, userId: string }, 
    user: any
}

class UserService {

    private readonly prisma: PrismaClient;

    constructor () {
        this.prisma = new PrismaClient();
    };

    private hashPassword (password: string): string {
        return hashSync(password);
    }

    private comparePassword (password: string, hash: string): boolean {
        return compareSync(password, hash);
    }

    async createUser (user: User): Promise<User> {
        try {
            const createdUser = await this.prisma.user.create({ 
                data: { 
                    name: user.name, 
                    email: user.email, 
                    password: this.hashPassword(user.password), 
                    role: user.role 
                } 
            });

            return createdUser;
        } catch (error: any) {
            console.log(error)
            throw new ServerException(error.message || "Erro ao criar usuário", error.status || 500);
        }
    }

    async updateUser (user: User): Promise<User> {
        try {
            const updatedUser = await this.prisma.user.update({ where: { id: user.id }, data: { name: user.name, email: user.email, password: user.password, role: user.role } })
        
            return updatedUser;
        } catch (error: any) {
            throw new ServerException(error.message || "Erro ao editar usuário", error.status || 500);
        }
    }

    async getAllUsers (): Promise<Array<User>> {
        try {
            const users = await this.prisma.user.findMany();

            return users;
        } catch (error: any) {
            throw new ServerException(error.message || "Erro ao buscar usuários", error.status || 500);
        }
    }

    async deleteUser (id: string): Promise<void> {
        try {
            await this.prisma.user.delete({ where: { id }});
        } catch (error: any) {
            throw new ServerException(error.message || "Erro ao excluir usuário", error.status || 500);
        }
    }

    async authenticateUser (email: string, password: string): Promise<AuthenticateUserReturn> {
        try {
            const user = await this.prisma.user.findFirst({ where: { email }});

            if (!user) {
                throw new ServerException("Este usuário não existe", 400);
            }

            if (!this.comparePassword(password, user.password)) {
                throw new ServerException("Usuário/senha inválidos", 400);
            }

            const authService = new AuthService();

            const refresh = await authService.generateRefreshToken(user.id);

            return {
                user: { name: user.name, email: user.email, id: user.id, role: user.role },
                token: authService.generateToken(user.id),
                refresh
            }
        } catch (error: any) {
            throw new ServerException(error.message || "Erro na autenticação", error.status || 500);
        }
    }

    async refreshUserToken (tokenId: string): Promise<{ token: string, refresh?: any }> {
        try {
            const refresh = await this.prisma.refreshToken.findFirst({ where: { id: tokenId } });

            if (!refresh) {
                throw new ServerException("Token inválido", 401);
            }

            const authService = new AuthService();

            const token = authService.generateToken(refresh.userId);

            if (authService.isTokenExpired(refresh.expiresIn)) {
                const newRefresh = await authService.generateRefreshToken(refresh.userId);

                return { token, refresh: newRefresh };
            }

            return { token };
        } catch (error: any) {
            throw new ServerException(error.message || "Algo deu errado");
        }
    }

    async logoutUser (userId: string): Promise<void> {
        try {
            await this.prisma.refreshToken.deleteMany({ where: { userId } });
        } catch (error: any) {
            throw new ServerException();
        }
    }
}

export default UserService;