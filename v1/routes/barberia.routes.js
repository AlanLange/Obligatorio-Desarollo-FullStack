import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { obtenerBarberia,crearBarberia } from '../controllers/barberia.controller.js';
import { barberiaSchema } from '../validators/barberia.validators.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

router.get('/', authMiddleware, obtenerBarberia);
router.post('/', authMiddleware, validateBody(barberiaSchema), crearBarberia);

export default router;