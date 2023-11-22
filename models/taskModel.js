import pool from '../config/database.js';

async function getTasks (user) {
  const [rows] = await pool.query(`
    SELECT 
      tasks.id, 
      tasks.title, 
      tasks.description, 
      task_categories.name AS category,
      task_categories.id AS category_id,
      tasks.status, 
      tasks.end_date,
      tasks.finish_hour,
      tasks.user_id,
      CONCAT("http://localhost:3000/uploads/profile_images/", users.profile_image) AS user_image
    FROM tasks
    INNER JOIN users ON tasks.user_id = users.id
    INNER JOIN task_categories ON tasks.task_category_id = task_categories.id
    INNER JOIN family_users ON tasks.user_id = family_users.user_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

async function addTask (user, { title, description, categoryId, userId, date, finishHour, status }) {
  const [result] = await pool.query(`
    INSERT INTO tasks (
      title, 
      description, 
      task_category_id, 
      user_id,
      group_id,
      end_date, 
      finish_hour, 
      status, 
      created_at
    )
    VALUES (
      ?, 
      ?, 
      ?, 
      ?, 
      ?,
      ?, 
      ?, 
      ?, 
      NOW()
    )
  `, [title, description, categoryId, userId, user.family_group_id, date, finishHour, status]);

  const [row] = await pool.query(`
    SELECT 
      CONCAT("http://localhost:3000/uploads/profile_images/", profile_image) AS avatarUrl
    FROM users 
    WHERE id = ?
  `, [userId]);

  const { avatarUrl } = row[0];
  const id = result.insertId;

  return {
    id,
    avatarUrl
  };
}

async function updateTask (user, id, { title, description, categoryId, date, finishHour, status }) {
  const [rows] = await pool.query(`
    UPDATE tasks
    INNER JOIN family_users ON tasks.user_id = family_users.user_id
    SET 
      title = ?, 
      description = ?, 
      task_category_id = ?, 
      end_date = ?, 
      finish_hour = ?, 
      status = ?,
      updated_at = NOW()
    WHERE id = ? AND family_users.family_group_id = ?
  `, [title, description, categoryId, date, finishHour, status, id, user.family_group_id]);

  return rows;
}

async function toggleCompleted (user, id, status) {
  const [rows] = await pool.query(`
    UPDATE tasks
    INNER JOIN family_users ON tasks.user_id = family_users.user_id
    SET 
      status = ?,
      updated_at = NOW()
    WHERE id = ? AND family_users.family_group_id = ?
  `, [status, id, user.family_group_id]);

  return rows;
}

async function deleteTask (user, id) {
  const [rows] = await pool.query(`
    DELETE FROM tasks
    WHERE id = ? AND tasks.user_id IN (
      SELECT user_id 
      FROM family_users 
      WHERE family_group_id = ?
    )
  `, [id, user.family_group_id]);

  return rows;
}

export default {
  getTasks,
  addTask,
  toggleCompleted,
  updateTask,
  deleteTask
};
