import Joi from "joi";

export const categoriaSchema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    cliente: Joi.string().optional()
});
