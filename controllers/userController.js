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
    const { username, pass } = req.body;

    const user = await User.validateUser(username, pass);

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

async function createUser (req, res) {
  try {
    const { username, name, email, pass } = req.body;

    const id = await User.createUser({ username, name, email, pass });

    if (!id) {
      return res.status(500).json({ message: 'Error al crear el usuario' });
    }

    validateUser(req, res);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

async function createMember (req, res) {
  try {
    const { code, username, name, email, pass } = req.body;

    const id = await User.createMember(code, { username, name, email, pass });

    if (!id) {
      return res.status(500).json({ message: 'Error al crear el usuario' });
    }

    validateUser(req, res);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

export default {
  getUser,
  validateUser,
  createUser,
  createMember
};
