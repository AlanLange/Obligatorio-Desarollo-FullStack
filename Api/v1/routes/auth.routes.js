import express from 'express';
const router = express.Router({ mergeParams: true });
import { login } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { usuarioLoginSchema } from '../validators/usuarios.validators.js';

router.post('/login', validateBody(usuarioLoginSchema), login);

export default router;
