import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cliente from "../models/cliente.model.js";
import Barbero from "../models/barbero.model.js";
export const obtenerUsuarioPorUsernameService = async (username) => {
   let buscado = await Cliente.findOne({ username }).exec();
  if (!buscado) {
    buscado = await Barbero.findOne({ username }).exec();
  }
  return buscado; // null si no está en ninguna
};

export const loginUsuarioService = async (username, password) => {
  let token = null;
  const usuario = await obtenerUsuarioPorUsernameService(username);
  if (!usuario) return null;
  if (bcrypt.compareSync(password, usuario.password)) {
    token = jwt.sign(
      { id: usuario._id, username: usuario.username },
      process.env.Secret,
      { expiresIn: "1h" }
    );
  }
    //console.log(bcrypt.hashSync("ColoradoHomosexual", 10));

  return token;
};
