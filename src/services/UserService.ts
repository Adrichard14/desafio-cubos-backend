import { UserRepository } from '../repositories/UserRepository';
import { HashService } from './HashService';
import { ValidationError } from '../errors/customErrors';
import { CreateUserDTO } from '../types/User';

export class UserService {
    private userRepository: UserRepository;
    private hashService: HashService;

    constructor() {
        this.userRepository = new UserRepository();
        this.hashService = new HashService();
    }

    async createUser(newUser: CreateUserDTO) {
        const requiredFields: Array<keyof CreateUserDTO> = ['name', 'email', 'password', 'confirmPassword', 'phone'];
        for (const field of requiredFields) {
            if (newUser[field] === undefined) {
                throw new ValidationError(
                    `O campo ${field} é obrigatório!`
                );
            }
        }
        const { name, email, password, confirmPassword, phone } = newUser;

        if (password !== confirmPassword) {
            throw new ValidationError(
                'A senha e a confirmação de senha precisam ser iguais!'
            );
        }
        await this.verifyExistingUser(newUser);

        const hashedPwd = await this.hashService.generatePwdHash(
            password
        );

        const encryptedPassword = hashedPwd;
        return this.userRepository.create({
            name,
            email,
            password: encryptedPassword,
            phone
        });
    }

    async listUsers() {
        return this.userRepository.findAll();
    }

    async verifyExistingUser(user: CreateUserDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(
            user.email
        );

        if (userAlreadyExists) {
            throw new ValidationError(
                'Já existe um usuário cadastrado com esse e-mail'
            );
        }

        const phoneAlreadyInUse = await this.userRepository.findByTelefone(
            user.phone
        );

        if (phoneAlreadyInUse) {
            throw new ValidationError(
                'Já existe um usuário cadastrado com esse telefone'
            );
        }
    }
}
