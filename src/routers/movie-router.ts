import express from 'express';
import { MovieController } from '../controllers/movieController';
const movieRouter = express.Router();
const movieController = new MovieController();

movieRouter.get('/movies', (req, res, next) => {
    movieController.listMovies(req, res, next);
});
movieRouter.post('/movie', (req, res, next) => {
    movieController.createMovie(req, res, next);
});
export default movieRouter;
