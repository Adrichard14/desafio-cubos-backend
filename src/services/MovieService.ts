import { ValidationError } from '../errors/customErrors';
import { MovieRepository } from '../repositories/MovieRepository';
import { CreateMovieDTO } from '../types/Movie';

export class MovieService {
    private moduloRepository: MovieRepository;

    constructor() {
        this.moduloRepository = new MovieRepository();
    }

    async createMovie(movie: CreateMovieDTO) {
        const requiredFields: Array<keyof CreateMovieDTO> = ['title'];
        for (const field of requiredFields) {
            if (movie[field] === undefined) {
                throw new ValidationError(
                    `O campo ${field} é obrigatório!`
                );
            }
        }

        return this.moduloRepository.create(movie);
    }

    async listMovies() {
        return this.moduloRepository.findAll();
    }
}
