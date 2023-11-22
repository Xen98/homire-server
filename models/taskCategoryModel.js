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

export default {
  getTasksCategories
};
