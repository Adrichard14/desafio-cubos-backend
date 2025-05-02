import { Request, Response, NextFunction } from 'express';
import { AutenticacaoService } from '../services/AutenticacaoService';

export class AutenticacaoController {
    private authService: AutenticacaoService;

    constructor() {
        this.authService = new AutenticacaoService();
    }

    async autenticar(req: Request, res: Response, next: NextFunction) {
        try {
            const responseAuth = await this.authService.autenticar(req.body);
            res.status(200).json(responseAuth);
        } catch (error: any) {
            return next(error);
        }
    }
}
