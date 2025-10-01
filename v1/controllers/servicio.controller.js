import { agregarServicioService } from "../services/servicio.services.js";


export const crearServicio = async(req, res) => {
    const id  = req.id;
    const servicioData = req.body;

    try{
        const servicio = await agregarServicioService(id, servicioData);
        if(!servicio) return res.status(400).json({message: 'Error al crear el servicio'});

        res.status(201).json({message: 'Servicio creado exitosamente', servicio });
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

