"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
const authController = new authController_1.AuthController();
authRouter.post('/auth', (req, res, next) => {
    authController.login(req, res, next);
});
exports.default = authRouter;
