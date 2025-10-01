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