import Barberia from "../models/barberia.model.js";
import Cliente from "../models/cliente.model.js";
import Servicio from "../models/servicio.model.js";


export const agregarServicioService = async (id, data) => {

    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    const barberia = await Barberia.findOne({ clienteId : id });

    if (!barberia) {
        throw new Error("Barbería no encontrada para este cliente");
    }

    if(cliente.plan === "Plus" && barberia.servicios.length >= 10) {
        throw new Error('Límite de servicios alcanzado para el plan Plus');
    }else{
        const servicioExistente = await Servicio.findOne({ 
            nombre: data.nombre
        });

        if (servicioExistente) {
            throw new Error('Ya existe un servicio con este nombre');
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
    if (!cliente) throw new Error('Cliente no encontrado');

    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) throw new Error('La barbería no está creada. Crea una barbería para ver los servicios.');
    await barberia.populate('servicios');

    return barberia.servicios;
}


export const obtenerServicioPorIdService = async (clienteId, servicioId) => {
    
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    
    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) throw new Error('La barbería no está creada. Crea una barbería para ver el servicio.');
    await barberia.populate('servicios');

    const servicio = barberia.servicios.find(servicio => servicio._id.toString() === servicioId);
    if (!servicio) throw new Error('Servicio no encontrado');

    return servicio;
}


export const eliminarServicioService = async (clienteId, servicioId) => {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    
    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) throw new Error('La barbería no está creada. Crea una barbería para eliminar servicios.');
    await barberia.populate('servicios');

    const eliminado = await Servicio.findByIdAndDelete(servicioId);
    if (!eliminado) throw new Error('Servicio no encontrado o ya eliminado');
    barberia.servicios.pull(servicioId);
    
    await cliente.save();
    return servicioId;
}

export const actualizarServicioService = async (clienteId, servicioId, data) => {

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');

    const barberia = await Barberia.findOne({ clienteId : clienteId });
    if (!barberia) throw new Error('La barbería no está creada. Crea una barbería para actualizar servicios.');
    await barberia.populate('servicios');

    const servicio = await Servicio.findByIdAndUpdate(servicioId, data, { new: true });
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
}
