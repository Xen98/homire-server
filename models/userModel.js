import pool from '../config/database.js';
import taskCategoryModel from './taskCategoryModel.js';
import belongingCategoryModel from './belongingCategoryModel.js';
import familyMemberModel from './familyMemberModel.js';

async function getUser (id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function createUser ({ username, name, email, pass }) {
  const [result] = await pool.query(`
    INSERT INTO users (
      username,
      name,
      email,
      pass,
      profile_image
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `, [username, name, email, pass, 'user.png']);

  const familyId = await familyMemberModel.createFamilyGroup(result.insertId, `${username}'s Family`);

  await familyMemberModel.assignMemberToFamily(result.insertId, familyId);

  await taskCategoryModel.createDefaultTasksCategories(familyId);

  await belongingCategoryModel.createDefaultBelongingsCategories(familyId);

  return result.insertId;
}

async function createMember (code, { username, name, email, pass }) {
  const familyId = await familyMemberModel.validateFamilyCode(code);

  if (!familyId) {
    throw new Error('Código incorrecto');
  }

  const [result] = await pool.query(`
    INSERT INTO users (
      username,
      name,
      email,
      pass,
      profile_image
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `, [username, name, email, pass, 'user.png']);

  await familyMemberModel.assignMemberToFamily(result.insertId, familyId);

  return result.insertId;
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
      family_groups.family_code,
      family_groups.name AS family_name
    FROM users 
    INNER JOIN family_users ON users.id = family_users.user_id
    INNER JOIN family_groups ON family_groups.id = family_users.family_group_id
    WHERE username = ? AND pass= ?
  `, [id, password]);

  const user = rows[0];

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  user.profile_image = `http://localhost:3000/uploads/profile_images/${user.profile_image}`;

  return user;
}

export default {
  getUser,
  validateUser,
  createUser,
  createMember
};
