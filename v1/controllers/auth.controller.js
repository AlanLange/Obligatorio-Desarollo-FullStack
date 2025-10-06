import { loginUsuarioService, registrarUsuarioService} from '../services/auth.services.js';
import {obtenerUsuarioPorUsernameService} from '../services/auth.services.js';

export const login = async(req, res, next) => {
  try{
    const { username, password,email } = req.body;
    const token = await loginUsuarioService(username,email, password);
    if(!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token, message: 'Login successful' });
  }
    catch (err) {
      next(err);
    }
}

export const register = async (req, res, next) => {
  try{
    const { username, password,email} = req.body;
    console.log(email);
    const usuario = await obtenerUsuarioPorUsernameService(username,email);
    if (usuario) return res.status(409).json({ message: "El usuario ya existe" });
    else {
      const token = await registrarUsuarioService({ username, password,email });
  
      return res
        .status(201)
        .json({ token, message: "Usuario creado exitosamente" });
    }
  }
    catch (err) {
      next(err);
    }
  };


