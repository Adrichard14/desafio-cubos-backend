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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const HashService_1 = require("./HashService");
const customErrors_1 = require("../errors/customErrors");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.hashService = new HashService_1.HashService();
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone'];
            for (const field of requiredFields) {
                if (newUser[field] === undefined) {
                    throw new customErrors_1.ValidationError(`O campo ${field} é obrigatório!`);
                }
            }
            const { name, email, password, confirmPassword, phone } = newUser;
            if (password !== confirmPassword) {
                throw new customErrors_1.ValidationError('A senha e a confirmação de senha precisam ser iguais!');
            }
            yield this.verifyExistingUser(newUser);
            const hashedPwd = yield this.hashService.generatePwdHash(password);
            const encryptedPassword = hashedPwd;
            return this.userRepository.create({
                name,
                email,
                password: encryptedPassword,
                phone
            });
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    verifyExistingUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.userRepository.findByEmail(user.email);
            if (userAlreadyExists) {
                throw new customErrors_1.ValidationError('Já existe um usuário cadastrado com esse e-mail');
            }
            const phoneAlreadyInUse = yield this.userRepository.findByTelefone(user.phone);
            if (phoneAlreadyInUse) {
                throw new customErrors_1.ValidationError('Já existe um usuário cadastrado com esse telefone');
            }
        });
    }
}
exports.UserService = UserService;
