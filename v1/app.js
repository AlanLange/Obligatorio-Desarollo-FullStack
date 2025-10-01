import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ratelimit from 'express-rate-limit';
import v1Routes from './v1.routes.js';
import connectDB from './config/db.js'
import errorMiddleware from './middlewares/error.middleware.js';
const app = express();
const PORT = process.env.PORT || 3000;
const limiter = ratelimit({
    windowMs: 15 *60 * 1000,
    max: 100 ,
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use(limiter);
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(`Holis`);
});
app.use ('/api', v1Routes);
app.use(errorMiddleware);
export default app;