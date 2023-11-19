import pool from '../config/database.js';

async function getUser (id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

export default {
  getUser
};
