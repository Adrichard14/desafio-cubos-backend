import express from 'express';
import { AuthController } from '../controllers/authController';
const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/auth', (req, res, next) => {
    authController.login(req, res, next);
});
export default authRouter;
