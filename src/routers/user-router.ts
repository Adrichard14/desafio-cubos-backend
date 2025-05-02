import express from 'express';
import { UserController } from '../controllers/userController';
const usuarioRouter = express.Router();
const userController = new UserController();

usuarioRouter.get('/users', (req, res, next) => {
    userController.listUsers(req, res, next);
});
usuarioRouter.post('/user', (req, res, next) => {
    userController.createUser(req, res, next);
});
export default usuarioRouter;
