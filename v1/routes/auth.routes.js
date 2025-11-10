import express from 'express';
const router = express.Router({ mergeParams: true });
import { login } from '../controllers/auth.controller.js';
import { register } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { usuarioLoginSchema } from '../validators/usuarios.validators.js';
import { usuarioRegisterSchema } from '../validators/usuarios.validators.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateSesion } from '../middlewares/validateSesion.middleware.js';


router.post('/login', validateBody(usuarioLoginSchema), login);

router.post('/register',validateBody(usuarioRegisterSchema), register);

// ✅ Primero valida token → setea req.id
// ✅ Luego busca en Mongo → setea req.username y req.plan
// ✅ Finalmente responde con los datos
router.get("/validatetoken", authMiddleware, validateSesion, validateToken);

export default router;
