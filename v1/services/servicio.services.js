import Barberia from "../models/barberia.model.js";
import Cliente from "../models/cliente.model.js";
import Servicio from "../models/servicio.model.js";


export const agregarServicioService = async (id, data) => {

    const cliente = await Cliente.findById(id);
    if (!cliente) 
        {
            const err = new Error("Cliente no encontrado");
            err.status = 404;
            throw err;
        }
    const barberia = await Barberia.findOne({ clienteId : id });

    if (!barberia) {
        const err = new Error("Barbería no encontrada para este cliente");
        err.status = 404;
        throw err;
    }

    if(cliente.plan === "Plus" && barberia.servicios.length >= 10) {
        const err = new Error('Límite de servicios alcanzado para el plan Plus');
        err.status = 403;
        throw err;
    }else{
        const servicioExistente = await Servicio.findOne({ 
            nombre: data.nombre
        });

        if (servicioExistente) {
            const err = new Error('Ya existe un servicio con este nombre');
            err.status = 409;
            throw err;
        }
        const servicio = new Servicio(data);
        await servicio.save();
    
        barberia.servicios.push(servicio._id);
        await barberia.save();
    
        return servicio;
    }
}

export const obtenerServiciosService = async (clienteId) => {


    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
        const err = new Error('Cliente no encontrado');
        err.status = 404;
        throw err;
    }

    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) {
        const err = new Error('La barbería no está creada. Crea una barbería para ver los servicios.');
        err.status = 404;
        throw err;
    }
    await barberia.populate('servicios');

    return barberia.servicios;
}


export const obtenerServicioPorIdService = async (clienteId, servicioId) => {
    
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
        const err = new Error('Cliente no encontrado');
        err.status = 404;
        throw err;
    }

    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) {
        const err = new Error('La barbería no está creada. Crea una barbería para ver los servicios.');
        err.status = 404;
        throw err;
    }
    await barberia.populate('servicios');

    const servicio = barberia.servicios.find(servicio => servicio._id.toString() === servicioId);
    if (!servicio) {
        const err = new Error('Servicio no encontrado');
        err.status = 404;
        throw err;
    }

    return servicio;
}


export const eliminarServicioService = async (clienteId, servicioId) => {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
        const err = new Error('Cliente no encontrado');
        err.status = 404;
        throw err;
    }

    const eliminado = await Servicio.findByIdAndDelete(servicioId);
    if (!eliminado) {
        const err = new Error('Servicio no encontrado o ya eliminado');
        err.status = 404;
        throw err;
    }
    const barberia = await Barberia.findOne({ clienteId: clienteId });
    if (!barberia) {
        const err = new Error('La barbería no está creada. Crea una barbería para eliminar servicios.');
        err.status = 404;
        throw err;
    }
    barberia.servicios.pull(servicioId);
    await barberia.save();
    return servicioId;
}

export const actualizarServicioService = async (clienteId, servicioId, data) => {

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
        const err = new Error('Cliente no encontrado');
        err.status = 404;
        throw err;
    }

    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) {
        const err = new Error('La barbería no está creada. Crea una barbería para actualizar servicios.');
        err.status = 404;
        throw err;
    }
    await barberia.populate('servicios');

    const servicio = await Servicio.findByIdAndUpdate(servicioId, data, { new: true });
    if (!servicio) {
        const err = new Error('Servicio no encontrado');
        err.status = 404;
        throw err;
    }
    return servicio;
}
