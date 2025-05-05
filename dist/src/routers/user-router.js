"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const usuarioRouter = express_1.default.Router();
const userController = new userController_1.UserController();
usuarioRouter.get('/users', (req, res, next) => {
    userController.listUsers(req, res, next);
});
usuarioRouter.post('/user', (req, res, next) => {
    userController.createUser(req, res, next);
});
exports.default = usuarioRouter;
