import Joi from "joi";
export const usuarioLoginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
});