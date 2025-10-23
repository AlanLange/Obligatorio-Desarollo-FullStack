// services/cliente.service.js
import mongoose from "mongoose";
import Cliente from "../models/cliente.model.js";
import Barberia from "../models/barberia.model.js";

export const actualizarPlanService = async (clienteId, nuevoPlan) => {
  if (!mongoose.isValidObjectId(clienteId)) {
    const err = new Error("clienteId inválido");
    err.status = 400;
    throw err;
  }

  const cliente = await Cliente.findById(clienteId);
  if (!cliente) {
    const err = new Error("Cliente no encontrado");
    err.status = 404;
    throw err;
  }

  const actual = cliente.plan;

  // Idempotencia
  if (actual === nuevoPlan) {
    return {
      _id: cliente._id,
      username: cliente.username,
      email: cliente.email,
      plan: cliente.plan,
      note: "El plan ya coincide con el solicitado",
    };
  }

  // Upgrade: Plus -> Premium
  if (actual === "Plus" && nuevoPlan === "Premium") {
    cliente.plan = "Premium";
    await cliente.save();
    return {
      _id: cliente._id,
      username: cliente.username,
      email: cliente.email,
      plan: cliente.plan,
      changed: true,
    };
  }

  // Downgrade: Premium -> Plus (restringido por límite de servicios)
  if (actual === "Premium" && nuevoPlan === "Plus") {
    // Buscar barbería del cliente y contar servicios
    const barberia = await Barberia.findOne({ clienteId }).select("servicios");
    const cant = barberia?.servicios?.length ?? 0;

    if (cant > 10) {
      const err = new Error(
        `No podés bajar a Plus: tenés ${cant} servicios (límite Plus = 10). Eliminá o archiva servicios hasta 10.`
      );
      err.status = 409;
      throw err;
    }

    cliente.plan = "Plus";
    await cliente.save();
    return {
      _id: cliente._id,
      username: cliente.username,
      email: cliente.email,
      plan: cliente.plan,
      changed: true,
    };
  }

  // Cualquier otra transición no permitida
  const err = new Error("Operación de cambio de plan no permitida");
  err.status = 400;
  throw err;
};
