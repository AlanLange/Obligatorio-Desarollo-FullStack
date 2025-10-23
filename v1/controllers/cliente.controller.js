import { actualizarPlanService } from "../services/cliente.service.js";

export const actualizarPlan = async (req, res, next) => {
  try {
    const result = await actualizarPlanService(req.id, req.body.plan);
    res.json(result);
  } catch (error) {
     if (error.status && error.status !== 500) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
    next(error);
  }
};
