import express from 'express';
const router = express.Router({ mergeParams: true });
import { login } from '../controllers/auth.controller.js';
import { register } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { usuarioLoginSchema } from '../validators/usuarios.validators.js';
import { usuarioRegisterSchema } from '../validators/usuarios.validators.js';

router.post('/login', validateBody(usuarioLoginSchema), login);

router.post('/register',validateBody(usuarioRegisterSchema), register);

export default router;
