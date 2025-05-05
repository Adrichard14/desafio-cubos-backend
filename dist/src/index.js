"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routers/user-router"));
const auth_router_1 = __importDefault(require("./routers/auth-router"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = (0, express_1.default)();
require("dotenv/config");
const movie_router_1 = __importDefault(require("./routers/movie-router"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
}));
app.use('/api', user_router_1.default);
app.use('/api', auth_router_1.default);
app.use('/api', movie_router_1.default);
app.use(errorHandler_1.default);
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Rota não encontrada!',
        },
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
