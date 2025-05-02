import prisma from '../../prisma/prismaClient';
import { CreateMovieDTO } from '../types/Movie';
export class MovieRepository {
    async create(data: CreateMovieDTO) {
        return prisma.movie.create({ data });
    }

    async findById(id: number) {
        return prisma.movie.findUnique({ where: { id } });
    }

    async findAll() {
        return prisma.movie.findMany({});
    }
}
