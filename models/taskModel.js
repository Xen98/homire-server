import pool from '../config/database.js';

async function getTasks () {
  const [rows] = await pool.query('SELECT * FROM tasks');
  return rows;
}

export default {
  getTasks
};
