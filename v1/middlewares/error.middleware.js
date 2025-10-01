export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Error Interno del Servidor";
    res.status(status).json({ message });
}