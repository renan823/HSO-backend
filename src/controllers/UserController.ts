import { NextFunction, Request, Response } from "express";
import { User } from "../domain/interfaces";
import UserService from "../services/user/UserService";
import ServerException from "../utils/errors/ServerException";
import AuthService from "../services/AuthService";

class UserController {
    
    constructor () {};

    async createUser (req: Request, res: Response, next: NextFunction) {
        const { user } = req.body as { user: User };
        const userService = new UserService();

        try {
            const createdUser = await userService.createUser(user);

            return res.status(201).json({ user: createdUser });
        } catch (error: any) {
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }

    async authenticateUser (req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as { email: string, password: string };
        const userService = new UserService();

        try {
            const { user, token, refresh } = await userService.authenticateUser(email, password);

            res.cookie("refresh", refresh, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(200).json({ user, token });
        } catch (error: any) {
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }

    async refreshUserToken (req: Request, res: Response, next: NextFunction) {
        const oldRefresh = req.cookies['refresh'];
        const userService = new UserService();

        try {
            const { token, refresh } = await userService.refreshUserToken(oldRefresh);

            res.cookie("refresh", refresh, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(200).json({ token });
        } catch (error: any) {
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }

    async logoutUser (req: Request, res: Response, next: NextFunction) {
        const refresh = req.cookies["refresh"]
        const authService = new AuthService();

        try {
            await authService.removeRefreshToken(refresh);

            res.cookie("refresh", "", { maxAge: 0 });

            return res.status(200).json({ token: "" });
        } catch (error: any) {
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }
}

export default UserController;