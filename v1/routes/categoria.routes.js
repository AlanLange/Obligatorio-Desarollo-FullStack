import express from 'express';
const router = express.Router({ mergeParams: true });

import { obtenerCategorias, crearCategoria } from '../controllers/categoria.controller.js';
import { categoriaSchema } from '../validators/categoria.validators.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';

router.get('/',  obtenerCategorias);
router.post('/', validateBody(categoriaSchema),  crearCategoria);



export default router;
