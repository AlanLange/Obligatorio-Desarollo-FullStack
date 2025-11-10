import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ratelimit from 'express-rate-limit';
import v1Routes from './v1.routes.js';
import connectDB from './config/db.js'
import errorMiddleware from './middlewares/error.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

const limiter = ratelimit({
    windowMs: 15 *60 * 1000,
    max: 100 ,
    standardHeaders: true, 
    legacyHeaders: false, 
});

//app.use(limiter);
connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(`Running Api`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Servir archivos estáticos desde /v1/public
app.use(express.static(path.join(__dirname, 'public')));

app.use ('/v1', v1Routes);
app.use(errorMiddleware);
export default app;