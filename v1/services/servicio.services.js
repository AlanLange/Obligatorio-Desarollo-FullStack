import Cliente from "../models/cliente.model.js";
import Servicio from "../models/servicio.model.js";


export const agregarServicioService = async (id, data) => {

    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('Cliente no encontrado');

    if(!cliente.barberia) {
        throw new Error('La barbería no está creada. Crea una barbería antes de agregar servicios.');
    }

    if(cliente.plan === "Plus" && cliente.barberia.servicios.length >= 10) {
        throw new Error('Límite de servicios alcanzado para el plan Plus');
    }else{
        const servicio = new Servicio(data);
        await servicio.save();
    
        cliente.barberia.servicios.push(servicio._id);
        await cliente.save();
    
        return servicio;
    }
}

export const obtenerServiciosService = async (clienteId) => {


    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    if (!cliente.barberia) throw new Error('La barbería no está creada. Crea una barbería para ver los servicios.');
    await cliente.barberia.populate('servicios');
    return cliente.barberia.servicios;
}


export const obtenerServicioPorIdService = async (clienteId, servicioId) => {
    
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    if (!cliente.barberia) throw new Error('La barbería no está creada. Crea una barbería para ver el servicio.');
    await cliente.barberia.populate('servicios');

    const servicio = cliente.barberia.servicios.find(servicio => servicio._id.toString() === servicioId);
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
}


export const eliminarServicioService = async (clienteId, servicioId) => {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    if (!cliente.barberia) throw new Error('La barbería no está creada. Crea una barbería para eliminar servicios.');
    await cliente.barberia.populate('servicios');

    const eliminado = await Servicio.findByIdAndDelete(servicioId);
    if (!eliminado) throw new Error('Servicio no encontrado o ya eliminado');
    cliente.barberia.servicios.pull(servicioId);
    
    await cliente.save();
    return servicioId;
}

export const actualizarServicioService = async (clienteId, servicioId, data) => {

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    if (!cliente.barberia) throw new Error('La barbería no está creada. Crea una barbería para actualizar servicios.');
    await cliente.barberia.populate('servicios');

    const servicio = await Servicio.findByIdAndUpdate(servicioId, data, { new: true });
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
}
