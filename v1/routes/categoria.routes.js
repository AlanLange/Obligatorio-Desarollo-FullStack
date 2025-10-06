import express from 'express';
const router = express.Router({ mergeParams: true });

import { obtenerCategorias, crearCategoria } from '../controllers/categoria.controller.js';

router.get('/',  obtenerCategorias);
router.post('/',  crearCategoria);



export default router;
