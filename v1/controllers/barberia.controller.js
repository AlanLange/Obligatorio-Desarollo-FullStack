import { obtenerBarberiaService,crearBarberiaService } from "../services/barberia.services.js";
import mongoose from "mongoose";

export const obtenerBarberia = async (req, res, next) => {
    const clienteId = req.id;
    try {
        const barberia = await obtenerBarberiaService(clienteId);
        res.json(barberia);
    } catch (error) {
        next(error);
    }
}


export const crearBarberia = async (req, res, next) => {
  try {
    const clienteId = req.id; // viene del authMiddleware
    if (!clienteId || !mongoose.isValidObjectId(clienteId)) {
      return res.status(401).json({ message: "Token inválido o usuario no autenticado" });
    }
    const barberia = await crearBarberiaService(clienteId, req.body);
    res.status(201).json(barberia);
  } catch (error) {
    if (error.status && error.status !== 500) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
    next(error);
  }
};
