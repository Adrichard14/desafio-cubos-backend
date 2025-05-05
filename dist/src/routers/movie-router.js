"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const movieRouter = express_1.default.Router();
const movieController = new movieController_1.MovieController();
movieRouter.get('/movies', (req, res, next) => {
    movieController.listMovies(req, res, next);
});
movieRouter.post('/movie', (req, res, next) => {
    movieController.createMovie(req, res, next);
});
exports.default = movieRouter;
