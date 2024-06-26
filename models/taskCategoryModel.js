import pool from '../config/database.js';

async function getTasksCategories (user) {
  const [rows] = await pool.query(`
    SELECT DISTINCT task_categories.* 
    FROM task_categories
    INNER JOIN family_users ON family_users.family_group_id = task_categories.group_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

async function createDefaultTasksCategories (groupId) {
  const [rows] = await pool.query(`
    INSERT INTO task_categories (
      name,
      color,
      group_id,
      created_at,
      updated_at
    )
    VALUES (
      'Limpieza', 
      '#6f9df1', 
      ?, 
      NOW(),
      NOW()
    ), (
      'Compras',
      '#f97316',
      ?,
      NOW(),
      NOW()
    )
  `, [groupId, groupId]);

  return rows;
}

export default {
  getTasksCategories,
  createDefaultTasksCategories
};
