import { NotFoundError, UnprocessableEntityError, ValidationError } from '../errors/customErrors';
import { MovieRepository } from '../repositories/MovieRepository';
import { CreateMovieDTO } from '../types/Movie';
import { AmazonService } from './AmazonService';

type MovieFilters = {
    startDate?: string;
    endDate?: string;
    duration?: number;
}
export class MovieService {
    private movieRepository: MovieRepository;
    private amazonService: AmazonService;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.amazonService = new AmazonService();
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
        let posterUrl = null;
        let backdropUrl = null
        if (movie.poster_path) {
            try {
                posterUrl = await this.amazonService.uploadImageToBucket(movie, movie.poster_path);
            } catch (error) {
                console.error('Erro ao fazer upload para S3:', error);
                throw new UnprocessableEntityError('Falha ao fazer upload da imagem');
            }
        }
        if (movie.backdrop_path) {
            try {
                backdropUrl = await this.amazonService.uploadImageToBucket(movie, movie.backdrop_path);
            } catch (error) {
                console.error('Erro ao fazer upload para S3:', error);
                throw new UnprocessableEntityError('Falha ao fazer upload da imagem');
            }
        }
        const formattedReleaseDate = new Date(movie.release_date);
        const formattedRuntime = parseInt(movie.runtime);
        return this.movieRepository.create({
            ...movie,
            runtime: formattedRuntime,
            release_date: formattedReleaseDate,
            poster_path: posterUrl,
            backdrop_path: backdropUrl
        });
    }

    async listMovies(filters: MovieFilters) {
        return this.movieRepository.findAll(filters);
    }

    async getMovieById(id: string) {
        const movie = await this.movieRepository.findById(parseInt(id));
        if (!movie) {
            throw new NotFoundError(
                `Filme inexistente!`
            );
        }
        return movie;
    }
}
