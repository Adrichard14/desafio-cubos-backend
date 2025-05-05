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
exports.MovieService = void 0;
const customErrors_1 = require("../errors/customErrors");
const MovieRepository_1 = require("../repositories/MovieRepository");
class MovieService {
    constructor() {
        this.moduloRepository = new MovieRepository_1.MovieRepository();
    }
    createMovie(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredFields = ['title'];
            for (const field of requiredFields) {
                if (movie[field] === undefined) {
                    throw new customErrors_1.ValidationError(`O campo ${field} é obrigatório!`);
                }
            }
            return this.moduloRepository.create(movie);
        });
    }
    listMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.moduloRepository.findAll();
        });
    }
}
exports.MovieService = MovieService;
