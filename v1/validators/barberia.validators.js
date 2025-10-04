import joi from "joi";
export const barberiaSchema = joi.object({
    clienteId: joi.number().required(),
    nombre: joi.string().min(3).max(100).required(),
    direccion: joi.string().min(10).max(200).required(),
    telefono: joi.string().min(7).max(15).required()
});