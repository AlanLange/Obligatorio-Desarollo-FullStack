import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
const router = express.Router();
router.use("/auth", authRoutes);
router.use(authMiddleware);
export default router;