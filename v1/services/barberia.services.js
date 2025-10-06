import Barberia from "../models/barberia.model.js";
import Cliente from "../models/cliente.model.js";
import mongoose from "mongoose";

export const obtenerBarberiaService = async (clienteId) => {
  if (!mongoose.isValidObjectId(clienteId)) {
    const err = new Error("clienteId inválido");
    err.status = 400;
    throw err;
  }
  const barberia = await Barberia
    .findOne({ clienteId })                 
  if (!barberia) {
    const err = new Error("Barbería no encontrada");
    err.status = 404;
    throw err;
  }

  return barberia;
};


export const crearBarberiaService = async (clienteId, data) => {
  if (!mongoose.isValidObjectId(clienteId)) {
    const err = new Error("clienteId inválido");
    err.status = 400;
    throw err;
  }

  const { nombre, direccion, telefono } = data;

  const cliente = await Cliente.findById(clienteId);
  if (!cliente) {
    const err = new Error("Cliente no encontrado");
    err.status = 404;
    throw err;
  }

  const existe = await Barberia.findOne({ clienteId });
  if (existe) {
    const err = new Error("El cliente ya tiene una barbería asociada");
    err.status = 409;
    throw err;
  }

  const barberia = new Barberia({
    nombre,
    direccion,
    telefono,
    clienteId,
  });

  await barberia.save();
  return barberia;
};