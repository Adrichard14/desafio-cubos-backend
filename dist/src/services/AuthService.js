"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const customErrors_1 = require("../errors/customErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    login(dadosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.verifyUser(dadosUsuario);
            const JWTSECRET = this.getJWTSecret();
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                nome: user.name,
            }, JWTSECRET, {
                expiresIn: '7d',
            });
            return {
                accessToken: token,
                message: 'Login Bem Sucedido',
            };
        });
    }
    verifyUser(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = null;
            if (dados.email) {
                user = yield this.userRepository.findByEmail(dados.email);
            }
            if (!dados.password) {
                throw new customErrors_1.ValidationError('Senha não informada');
            }
            if (!user) {
                throw new customErrors_1.NotFoundError('Nenhum usuário encontrado');
            }
            yield this.verificaSenhaUsuario(dados.password, user.password);
            return user;
        });
    }
    verificaSenhaUsuario(senhaRequest, senhaUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const senhaCorreta = yield bcrypt_1.default.compare(senhaRequest, senhaUsuario);
            if (!senhaCorreta) {
                throw new customErrors_1.ValidationError('Credenciais inválidas.');
            }
        });
    }
    getJWTSecret() {
        const JWTSECRET = process.env.JWT_SECRET;
        if (!JWTSECRET) {
            throw new customErrors_1.UnprocessableEntityError('JWT_SECRET não está definida nas variáveis de ambiente');
        }
        return JWTSECRET;
    }
}
exports.AuthService = AuthService;
