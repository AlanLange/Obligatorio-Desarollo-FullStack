import Cliente from "../models/cliente.model.js";
import Servicio from "../models/servicio.model.js";


export const agregarServicioService = async (id, data) => {

    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('Cliente no encontrado');

    if(cliente.plan === "Plus" && cliente.servicios.length >= 10) {
        throw new Error('Límite de servicios alcanzado para el plan Plus');
    }else{
        const servicio = new Servicio(data);
        await servicio.save();
    
        cliente.servicios.push(servicio._id);
        await cliente.save();
    
        return servicio;
    }
}

export const obtenerServiciosService = async (clienteId) => {
    const cliente = await Cliente.findById(clienteId).populate('servicios');
    if (!cliente) throw new Error('Cliente no encontrado');
    return cliente.servicios;
}


export const obtenerServicioPorIdService = async (clienteId, servicioId) => {
    const cliente = await Cliente.findById(clienteId).populate('servicios');
    if (!cliente) throw new Error('Cliente no encontrado');
    const servicio = cliente.servicios.find(servicio => servicio._id.toString() === servicioId);
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
}


export const eliminarServicioService = async (clienteId, servicioId) => {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    const eliminado = await Servicio.findByIdAndDelete(servicioId);
    if (!eliminado) throw new Error('Servicio no encontrado o ya eliminado');
    cliente.servicios.pull(servicioId);
    await cliente.save();
    return servicioId;
}

export const actualizarServicioService = async (clienteId, servicioId, data) => {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');
    const servicio = await Servicio.findByIdAndUpdate(servicioId, data, { new: true });
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
}
