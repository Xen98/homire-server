import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function getUser (req, res) {
  try {
    const user = await User.getUser(req.params.id);
    res.json({ user });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

async function validateUser (req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.validateUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(user, 'mi_secreto', { expiresIn: '1h' });

    res.json({ ...user, token });
  } catch (error) {
    console.error('Error al validar el usuario:', error);
    res.status(500).json({ error: 'Error al validar el usuario' });
  }
}

export default {
  getUser,
  validateUser
};
