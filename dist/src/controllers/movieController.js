"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const MovieService_1 = require("../services/MovieService");
class MovieController {
    constructor() {
        this.movieService = new MovieService_1.MovieService();
    }
    createMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.movieService.createMovie(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    listMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.movieService.listMovies();
                res.status(200).json(users);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.MovieController = MovieController;
