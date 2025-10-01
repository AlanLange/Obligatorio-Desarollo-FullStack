import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { crearServicio } from '../controllers/servicio.controller.js';
import { serviciosSchema } from '../validators/servicio.validators.js';

router.post('/', validateBody(serviciosSchema), crearServicio);

export default router;
