const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) return next(err);
  
    const status = err.status ?? err.statusCode ?? 500;
    /*
    const isDev = process.env.NODE_ENV !== 'production';
  
    console.error(err);
  
    const payload = {
      message: isDev ? (err.message || 'Internal Server Error') : 'Error Interno del Servidor',
    };
  
    if (isDev && err.stack) payload.stack = err.stack;
    if (isDev && err.errors) payload.errors = err.errors; 
  
    res.status(status).json(payload);
    */
    // 🔎 Respuesta VERBOSA para debug (DEV TEMPORAL)
  res.status(status).json({
    name: err.name,
    message: err.message,
    status,
    code: err.code,
    errors: err.errors,
    cause: err.cause && (err.cause.message ?? String(err.cause)),
    stack: err.stack, // texto completo
  });
  };
  
  export default errorMiddleware;
  