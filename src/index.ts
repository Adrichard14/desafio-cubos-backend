import express from 'express';
import userRoute from './routers/user-router';
import authRouter from './routers/auth-router';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = express();
import 'dotenv/config';
import movieRouter from './routers/movie-router';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});
app.use(
    cors({
        origin: ['http://localhost:4000'],
    })
);
app.use('/api', userRoute);
app.use('/api', authRouter);
app.use('/api', movieRouter);

app.use(errorHandler);

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
