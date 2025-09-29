// api/v1/middlewares/validateBody.middleware.js
export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,   // reporta todos los errores
      stripUnknown: true,  // elimina campos no permitidos
    });

    if (error) {
      return res.status(400).json({
        message: 'Invalid request body',
        details: error.details.map(d => ({
          message: d.message,
          path: d.path.join('.'),
          type: d.type,
        })),
      });
    }

    req.body = value; // body saneado y validado
    next();
  };
};
