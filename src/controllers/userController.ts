import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            return next(error);
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.listUsers();
            res.status(200).json(users);
        } catch (error: any) {
            return next(error);
        }
    }
}
