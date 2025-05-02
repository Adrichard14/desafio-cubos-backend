import { NextFunction, Request, Response } from 'express';
import { MovieService } from '../services/MovieService';

export class MovieController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.movieService.createMovie(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            return next(error);
        }
    }

    async listMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.movieService.listMovies();
            res.status(200).json(users);
        } catch (error: any) {
            return next(error);
        }
    }
}
