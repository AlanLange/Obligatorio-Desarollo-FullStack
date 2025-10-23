import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { actualizarServicio, crearServicio, eliminarServicio, obtenerServicioPorId, obtenerServicios } from '../controllers/servicio.controller.js';
import { serviciosPutSchema, serviciosSchema } from '../validators/servicio.validators.js';

router.get('/',  obtenerServicios);

router.get('/:servicioId', obtenerServicioPorId);

router.post('/', validateBody(serviciosSchema), crearServicio);


router.patch('/:servicioId', validateBody(serviciosPutSchema), actualizarServicio);

router.delete('/:servicioId', eliminarServicio);


export default router;
