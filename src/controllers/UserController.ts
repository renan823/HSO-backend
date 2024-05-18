import { NextFunction, Request, Response } from "express";
import { User } from "../domain/interfaces";
import UserService from "../services/user/UserService";
import ServerException from "../utils/errors/ServerException";

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
            const auth = await userService.authenticateUser(email, password);

            return res.status(200).json({ ...auth });
        } catch (error: any) {
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }

    async refreshUserToken (req: Request, res: Response, next: NextFunction) {
        const { tokenId } = req.body as { tokenId: string };
        const userService = new UserService();

        try {
            const { token, refresh } = await userService.refreshUserToken(tokenId);

            return res.status(200).json({ token, refresh });
        } catch (error: any) {
            console.log(error)
            return next(new ServerException(error.message || "Algo deu errado", error.status || 500));
        }
    }
}

export default UserController;