import { actualizarPlanService } from "../services/cliente.service.js";

export const actualizarPlan = async (req, res, next) => {
  try {
    const result = await actualizarPlanService(req.id, req.body.plan);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
