import express from 'express';
import { MovieController } from '../controllers/movieController';
import multer from 'multer';
const movieRouter = express.Router();
const movieController = new MovieController();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

movieRouter.get('/movies', (req, res, next) => {
    movieController.listMovies(req, res, next);
});
movieRouter.get('/movie/:id', (req, res, next) => {
    movieController.getMovieById(req, res, next);
});
movieRouter.post(
    '/movie',
    upload.fields([
        { name: 'poster_path', maxCount: 1 },
        { name: 'backdrop_path', maxCount: 1 }
    ]),
    (req, res, next) => {
        movieController.createMovie(req, res, next);
    }
);
export default movieRouter;
