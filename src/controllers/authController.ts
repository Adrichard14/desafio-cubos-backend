import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const responseAuth = await this.authService.login(req.body);
            res.status(200).json(responseAuth);
        } catch (error: any) {
            return next(error);
        }
    }
}
