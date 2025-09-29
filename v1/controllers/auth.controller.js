import { loginUsuarioService, registrarUsuarioService} from '../services/auth.services.js';
import {obtenerUsuarioPorUsernameService} from '../services/auth.services.js';

export const login = async(req, res) => {
    const { username, password } = req.body;
    const token = await loginUsuarioService(username, password);
    if(!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token, message: 'Login successful' });
}

export const register = async (req, res) => {
    const { username, password,email} = req.body;
    console.log(email);
    const usuario = await obtenerUsuarioPorUsernameService(username);
    if (usuario) return res.status(409).json({ message: "El usuario ya existe" });
    else {
      const token = await registrarUsuarioService({ username, password,email });
  
      return res
        .status(201)
        .json({ token, message: "Usuario creado exitosamente" });
    }
  };


