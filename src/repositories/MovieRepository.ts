import prisma from '../../prisma/prismaClient';
import { CreateMovieDTO } from '../types/Movie';


type MovieFilters = {
    startDate?: string;
    endDate?: string;
    duration?: number;
}
export class MovieRepository {
    async create(data: CreateMovieDTO) {
        return prisma.movie.create({ data });
    }

    async findById(id: number) {
        return prisma.movie.findUnique({ where: { id } });
    }

    async findAll(filters: MovieFilters) {
        return await prisma.movie.findMany({
            where: {
                ...(filters.startDate && filters.endDate && {
                    release_date: {
                        gte: new Date(filters.startDate),
                        lte: new Date(filters.endDate),
                    },
                }),
                ...(filters.duration && {
                    runtime: {
                        gte: filters.duration
                    },
                }),
            },
        });
    }
}
