import { NextFunction, Request, Response } from 'express';
import { MovieService } from '../services/MovieService';
interface MulterFiles {
    [key: string]: Express.Multer.File[];
}

export interface MovieFilters {
    startDate?: string;
    endDate?: string;
    duration?: number;
  }
export class MovieController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const files = req.files as MulterFiles;

            if (!files['poster_path'] || !files['backdrop_path']) {
                throw new Error('Ambos os arquivos (poster e backdrop) são obrigatórios');
            }

            const posterFile = files['poster_path'][0];
            const backdropFile = files['backdrop_path'][0];

            const movieData = {
                ...body,
                poster_path: posterFile.buffer,
                backdrop_path: backdropFile.buffer,
            };

            const movie = await this.movieService.createMovie(movieData);
            res.status(201).json(movie);
        } catch (error: any) {
            return next(error);
        }
    }

    async listMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const movieFilters: MovieFilters = req.query;
            const users = await this.movieService.listMovies(movieFilters);
            res.status(200).json(users);
        } catch (error: any) {
            return next(error);
        }
    }

    async getMovieById(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.movieService.getMovieById(req.params.id);
            res.status(200).json(users);
        } catch (error: any) {
            return next(error);
        }
    }
}
