import Barberia from "../models/barberia.model";
import Cliente from "../models/cliente.model.js";

export const obtenerBarberiaService = async (clienteId) => {
    const barberia = await Barberia.findOne({ cliente: clienteId }).populate('servicios');
    if (!barberia) throw new Error('Barbería no encontrada');
    return barberia;
}

export const crearBarberiaService = async (clienteId, data) => {
    const {nombre,direccion,telefono} = data;
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    const existingBarberia = await Barberia.findOne({ cliente: clienteId });
    if (existingBarberia) throw new Error('El cliente ya tiene una barbería asociada');
    const barberia = new Barberia({nombre,direccion,telefono, Cliente : clienteId });
    await barberia.save();
    return barberia;
}