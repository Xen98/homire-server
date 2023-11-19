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

export default {
  getUser
};
