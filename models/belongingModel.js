import pool from '../config/database.js';

async function getBelongings (user) {
  const [rows] = await pool.query(`
    SELECT 
      belongings.id,
      belongings.user_id,
      belongings.name,
      belonging_category_id,
      CONCAT("http://localhost:3000/uploads/belonging_images/", belongings.image) AS image
    FROM belongings
    INNER JOIN family_users ON family_users.user_id = belongings.user_id
    INNER JOIN family_groups ON family_groups.id = family_users.family_group_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

export default {
  getBelongings
};
