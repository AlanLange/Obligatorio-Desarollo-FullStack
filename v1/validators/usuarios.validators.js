import Joi from "joi";
export const usuarioLoginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
});
export const usuarioRegisterSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({'any.only': 'Ambas contraseñas deben ser iguales'}),
    email: Joi.string().min(6).max(128).required()
});