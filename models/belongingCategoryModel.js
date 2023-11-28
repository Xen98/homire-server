import pool from '../config/database.js';

async function getBelongingsCategories (user) {
  const [rows] = await pool.query(`
    SELECT DISTINCT belonging_categories.* 
    FROM belonging_categories
    INNER JOIN family_users ON family_users.family_group_id = belonging_categories.group_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

async function createDefaultBelongingsCategories (groupId) {
  const [rows] = await pool.query(`
    INSERT INTO belonging_categories (
      name,
      color,
      group_id,
      created_at,
      updated_at
    )
    VALUES (
      'Muebles', 
      '#6f9df1', 
      ?,
      NOW(),
      NOW()
    ), (
      'Electrodomesticos',
      '#f97316',
      ?,
      NOW(),
      NOW()
    )
  `, [groupId, groupId]);

  return rows;
}

export default {
  getBelongingsCategories,
  createDefaultBelongingsCategories
};
