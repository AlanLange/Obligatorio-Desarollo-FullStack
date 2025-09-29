import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cliente from "../models/cliente.model.js";
export const obtenerUsuarioPorUsernameService = async (username) => {
   let buscado = await Cliente.findOne({ username }).exec();
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
    //console.log(bcrypt.hashSync("Test123", 10));

  return token;
};


export const registrarUsuarioService = async (data) => {
  const { password, username,email } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = new Cliente({username, password: hashedPassword,email});
  await nuevoUsuario.save();
  const token = jwt.sign({ username }, process.env.Secret, { expiresIn: "1h" });
  return token;
};