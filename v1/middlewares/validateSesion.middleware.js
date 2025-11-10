import Cliente from "../models/cliente.model.js";

export const validateSesion = async (req, res, next) => {
  try {
    // req.id viene del middleware auth
    const cliente = await Cliente.findById(req.id);

   if (!cliente) {
  return res.status(401).json({ message: "Sesión inválida" });
}
    req.username = cliente.username;
    req.plan = cliente.plan;

    next();
  } catch (error) {
    console.error("Error buscando cliente:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
