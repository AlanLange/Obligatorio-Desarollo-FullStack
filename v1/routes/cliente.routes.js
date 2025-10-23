import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { planSchema } from "../validators/usuarios.validators.js";
import { actualizarPlan } from "../controllers/cliente.controller.js";

const router = Router();

router.patch("/plan", validateBody(planSchema), actualizarPlan);

export default router;
