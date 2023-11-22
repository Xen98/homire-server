import jwt from 'jsonwebtoken';

import pool from '../config/database.js';

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  try {
    const user = await jwt.verify(token, 'mi_secreto');

    req.user = user;

    const groupId = user.family_group_id;
    console.log(user.id, groupId);
    const results = await pool.query('SELECT 1 FROM family_users WHERE user_id = ? AND family_group_id = ?', [user.id, groupId]);

    if (results.length === 0) {
      return res.status(403).json({ message: 'El usuario no pertenece al grupo familiar' });
    }

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: 'Token inválido' });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

export default authenticateToken;
