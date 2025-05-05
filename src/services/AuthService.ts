import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import {
    NotFoundError,
    UnprocessableEntityError,
    ValidationError,
} from '../errors/customErrors';
import { AutenticateUserDTO, ResponseAutenticatedUser } from '../types/Auth';
import jwt from 'jsonwebtoken';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(
        userData: AutenticateUserDTO
    ): Promise<ResponseAutenticatedUser> {
        const user = await this.verifyUser(
            userData
        );

        const JWTSECRET = this.getJWTSecret();

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.name,
            },
            JWTSECRET,
            {
                expiresIn: '7d',
            }
        );

        return {
            accessToken: token,
            message: 'Login Bem Sucedido',
        };
    }

    async verifyUser(dados: AutenticateUserDTO) {
        let user = null;

        if (dados.email) {
            user = await this.userRepository.findByEmail(dados.email);
        }
        if (!dados.password) {
            throw new ValidationError('Senha não informada');
        }

        if (!user) {
            throw new NotFoundError('Nenhum usuário encontrado');
        }

        await this.verificaSenhaUsuario(dados.password, user.password);

        return user;
    }

    async verificaSenhaUsuario(password: string, realUserPwd: string) {
        const senhaCorreta = await bcrypt.compare(password, realUserPwd);

        if (!senhaCorreta) {
            throw new ValidationError('Credenciais inválidas.');
        }
    }

    getJWTSecret() {
        const JWTSECRET = process.env.JWT_SECRET;
        if (!JWTSECRET) {
            throw new UnprocessableEntityError(
                'JWT_SECRET não está definida nas variáveis de ambiente'
            );
        }

        return JWTSECRET;
    }
}
