import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { obtenerBarberia,crearBarberia } from '../controllers/barberia.controller.js';
import { barberiaSchema } from '../validators/barberia.validators.js';
import { autenticar } from '../middlewares/auth.middleware.js';

router.get('/', autenticar, obtenerBarberia);
router.post('/', autenticar, validateBody(barberiaSchema), crearBarberia);

export default router;