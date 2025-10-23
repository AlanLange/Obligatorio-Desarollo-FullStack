import Joi from "joi";
export const usuarioLoginSchema = Joi.object({
    email: Joi.string().email().min(6).max(128),
    username: Joi.string().min(3).max(30),
    password: Joi.string().min(6).max(128).required(),
    
})// 👉 exige que venga email O username (uno de los dos, pero no necesariamente ambos)
.xor('email', 'username')
.messages({
  'object.missing': 'Debes proporcionar al menos un email o un username.',
  'object.xor': 'Debes proporcionar solo uno: email o username (no ambos).',
});
export const usuarioRegisterSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({'any.only': 'Ambas contraseñas deben ser iguales'}),
    email: Joi.string().email().min(6).max(128).required()
});

export const planSchema = Joi.object({
  plan: Joi.string().valid("Plus", "Premium").required(),
}).options({ abortEarly: false, stripUnknown: true });
