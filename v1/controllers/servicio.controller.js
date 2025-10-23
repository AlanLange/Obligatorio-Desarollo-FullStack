import { actualizarServicioService, agregarServicioService, eliminarServicioService, obtenerServicioPorIdService, obtenerServiciosService } from "../services/servicio.services.js";


export const crearServicio = async(req, res, next) => {
    const id  = req.id;
    const servicioData = req.body;

    try{
        const servicio = await agregarServicioService(id, servicioData);
        if(!servicio) return res.status(400).json({message: 'Error al crear el servicio'});

        res.status(201).json({message: 'Servicio creado exitosamente', servicio });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }
}

export const obtenerServicios = async(req, res, next) => {
    const id  = req.id;
    try{
        const servicios = await obtenerServiciosService(id);
        res.status(200).json({ servicios });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }
}

export const obtenerServicioPorId = async(req, res, next) => {
    const id  = req.id;
    const { servicioId } = req.params;
    try{
        const servicio = await obtenerServicioPorIdService(id, servicioId);
        res.status(200).json({ servicio });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }   
}

export const actualizarServicio = async(req, res, next) => {
    const id  = req.id;
    const { servicioId } = req.params;
    const servicioData = req.body;

    try{
        const servicio = await actualizarServicioService(id, servicioId, servicioData);
        if(!servicio) return res.status(400).json({message: 'Error al actualizar el servicio'});
        
        res.status(200).json({message: 'Servicio actualizado exitosamente', servicio });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }
}

export const eliminarServicio = async(req, res, next) => {
    const id  = req.id;
    const { servicioId } = req.params;
    try{
        const eliminado = await eliminarServicioService(id, servicioId);
        if(!eliminado) return res.status(400).json({message: 'Error al eliminar el servicio'});
        res.status(200).json({message: 'Servicio eliminado exitosamente', eliminado });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }   

}