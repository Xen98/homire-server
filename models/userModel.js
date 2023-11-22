import pool from '../config/database.js';

async function getUser (id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function validateUser (id, password) {
  const [rows] = await pool.query(`
    SELECT 
      users.id, 
      users.username, 
      users.name, 
      users.email, 
      users.profile_image,
      family_users.family_group_id,
      family_groups.name AS family_name
    FROM users 
    INNER JOIN family_users ON users.id = family_users.user_id
    INNER JOIN family_groups ON family_groups.id = family_users.family_group_id
    WHERE username = ? AND pass= ?
  `, [id, password]);

  const user = rows[0];

  user.profile_image = `http://localhost:3000/uploads/profile_images/${user.profile_image}`;

  return user;
}

export default {
  getUser,
  validateUser
};
