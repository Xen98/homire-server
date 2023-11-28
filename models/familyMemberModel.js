import pool from '../config/database.js';

import { generateFamilyCode } from '../helpers/familyCode.js';

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

async function createFamilyGroup (userId, familyName) {
  let familyCode;
  let isValidCode;

  do {
    familyCode = generateFamilyCode(6);
    isValidCode = !await existFamilyCode(familyCode);
  } while (!isValidCode);

  const [resultFamily] = await pool.query(`
    INSERT INTO family_groups (
      admin_id,
      name,
      family_code,
      created_at,
      updated_at
    ) VALUES (
      ?,
      ?,
      ?,
      NOW(),
      NOW()
    )
  `, [userId, familyName, familyCode]);

  return resultFamily.insertId;
}

async function assignMemberToFamily (userId, familyId) {
  await pool.query(`
    INSERT INTO family_users (
      user_id,
      family_group_id
    ) VALUES (
      ?,
      ?
    )
  `, [userId, familyId]);
}

async function existFamilyCode (code) {
  const [rows] = await pool.query(`
    SELECT * FROM family_groups WHERE family_code = ?
  `, [code]);

  return rows.length;
}

async function validateFamilyCode (code) {
  const [rows] = await pool.query(`
    SELECT * FROM family_groups WHERE family_code = ?
  `, [code]);

  return rows[0]?.id;
}

export default {
  getFamilyMembers,
  assignMemberToFamily,
  createFamilyGroup,
  validateFamilyCode
};
