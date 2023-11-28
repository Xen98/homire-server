import pool from '../config/database.js';

async function getBelongings (user) {
  const [rows] = await pool.query(`
    SELECT 
      belongings.id,
      belongings.user_id AS userId,
      belongings.name,
      belonging_category_id AS categoryId,
      CONCAT("http://localhost:3000/uploads/belonging_images/", belongings.image) AS image
    FROM belongings
    INNER JOIN family_users ON family_users.user_id = belongings.user_id
    INNER JOIN family_groups ON family_groups.id = family_users.family_group_id
    WHERE family_users.family_group_id = ?
  `, [user.family_group_id]);

  return rows;
}

async function addBelonging (user, { name, image, categoryId, userId }) {
  image = 'box.jpg';

  const [result] = await pool.query(`
    INSERT INTO belongings (
      name,
      image,
      belonging_category_id,
      user_id,
      group_id,
      created_at
    )
    VALUES (
      ?, 
      ?, 
      ?, 
      ?, 
      ?,
      NOW()
    )
  `, [name, image, categoryId, userId, user.family_group_id]);

  const id = result.insertId;

  return {
    id
  };
}

async function updateBelonging (user, id, { name, image, categoryId, userId }) {
  image = `${id}.jpg`;

  const [rows] = await pool.query(`
    UPDATE belongings
    INNER JOIN family_users ON belongings.user_id = family_users.user_id
    SET 
      belongings.name = ?, 
      belongings.belonging_category_id = ?,
      belongings.image = ?,
      belongings.user_id = ?,
      belongings.updated_at = NOW()
    WHERE belongings.id = ? AND family_users.family_group_id = ?
  `, [name, categoryId, image, userId, id, user.family_group_id]);

  return rows;
}

async function deleteBelonging (user, id) {
  const [rows] = await pool.query(`
    DELETE FROM belongings
    WHERE id = ? AND belongings.user_id IN (
      SELECT user_id 
      FROM family_users 
      WHERE family_group_id = ?
    )
  `, [id, user.family_group_id]);

  return rows;
}

export default {
  getBelongings,
  addBelonging,
  updateBelonging,
  deleteBelonging
};
