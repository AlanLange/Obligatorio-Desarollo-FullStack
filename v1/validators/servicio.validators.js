import Joi from "joi";
export const serviciosSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required(),
    descripcion: Joi.string().min(10).max(500).required(),
    precio: Joi.number().min(0).required(),
    categoria: Joi.string().required(),
    duracion: Joi.number().min(1).required()
});

