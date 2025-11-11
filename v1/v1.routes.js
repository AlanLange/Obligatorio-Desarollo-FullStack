import express from 'express';
import authRoutes from './routes/auth.routes.js';
import serviciosRoutes from './routes/servicio.routes.js';
import categoriasRoutes from './routes/categoria.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import barberiaRoutes from './routes/barberia.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import uploadRoutes from './routes/upload.routes.js';


const router = express.Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);

router.use("/servicios", serviciosRoutes);

router.use("/categorias", categoriasRoutes);

router.use("/barberia", barberiaRoutes);

router.use("/cliente", clienteRoutes);

router.use('/upload', uploadRoutes);


export default router;