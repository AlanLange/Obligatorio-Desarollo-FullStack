import { loginUsuarioService} from '../services/auth.services.js';

export const login = async(req, res) => {
    const { username, password } = req.body;
    const token = await loginUsuarioService(username, password);
    if(!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token, message: 'Login successful' });
}



