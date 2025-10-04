import { obtenerBarberiaService,crearBarberiaService } from "../services/barberia.services";

export const obtenerBarberia = async (req, res, next) => {
    const clienteId = req.id;
    try {
        const barberia = await obtenerBarberiaService(clienteId);
        res.json(barberia);
    } catch (error) {
        next(error);
    }
}

export const crearBarberia = async (req, res, next) => {
    const clienteId = req.id;
    const data = req.body;
    try {
        const barberia = await crearBarberiaService(clienteId, data);
        res.status(201).json(barberia);
    } catch (error) {
        next(error);
    }
}