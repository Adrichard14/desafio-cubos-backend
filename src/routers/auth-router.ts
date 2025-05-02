import express from 'express';
import { AutenticacaoController } from '../controllers/authController';
const authRouter = express.Router();
const authController = new AutenticacaoController();

authRouter.post('/auth', (req, res, next) => {
    authController.autenticar(req, res, next);
});
export default authRouter;
