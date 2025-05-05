import prisma from '../../prisma/prismaClient';
import { CreateUserDTO } from '../types/User';
export class UserRepository {
    async create(data: CreateUserDTO) {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findAll() {
        return prisma.user.findMany({
            omit: {
                password: true,
            }
        });
    }
}
