import { loginUsuarioService, registrarUsuarioService} from '../services/auth.services.js';
import {obtenerUsuarioPorUsernameService} from '../services/auth.services.js';

export const login = async(req, res, next) => {
  try{
    const { username, password,email } = req.body;
    const usuario = await obtenerUsuarioPorUsernameService(username,email);
    const token = await loginUsuarioService(username,email, password);
    const {plan,username: nombreUsuario} =  usuario;
    if(!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token, plan,username: nombreUsuario, message: 'Login successful' });
  }
    catch (error) {
      if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
      next(error);
    }
}

export const register = async (req, res, next) => {
  try{
    console.log(req.body);
    const { username, password,email} = req.body;
    console.log(username);
    
    const usuario = await obtenerUsuarioPorUsernameService(username,email);
    if (usuario) return res.status(409).json({ message: "El usuario ya existe" });
    else {
      const token = await registrarUsuarioService({ username, password,email });
      return res
        .status(201)
        .json({ token,message: "Usuario creado exitosamente" });
    }
  }
    catch (error) {
      if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
      next(error);
    }
  };

export const validateToken = (req, res) => {
  return res.status(200).json({
    valid: true,
     ...req.user,
  });
};




