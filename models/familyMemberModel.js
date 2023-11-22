import pool from '../config/database.js';

async function getFamilyMembers (user) {
  const [rows] = await pool.query(`
    SELECT 
      users.id, 
      users.username, 
      users.name, 
      users.email, 
      CONCAT("http://localhost:3000/uploads/profile_images/", users.profile_image) AS avatarUrl,
      family_groups.admin_id AS adminId
    FROM users
    INNER JOIN family_users ON family_users.user_id = users.id
    INNER JOIN family_groups ON family_groups.id = family_users.family_group_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

export default {
  getFamilyMembers
};
