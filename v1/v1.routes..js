import express from 'express';
import authRoutes from './routes/auth.routes.js';
import agendasRoutes from './routes/agenda.routes.js';

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/agendas", agendasRoutes);

export default router;