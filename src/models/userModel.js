import pool from "../db.js";
import bcrypt from "bcryptjs";

//Create a new user
export const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at;;
    `;
  const values = [name, email, hashedPassword, role];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

//Search by email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email=$1;`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

//List all users
export const getAllUsers = async () => {
    const query = `SELECT id, name, email, role, created_at FROM users ORDER BY id DESC;`;
    const {rows} = await pool.query(query);
    return rows;
};

//Update user
export const updateUser = async (id, name, email, role) => {
  const query = `UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING id, name, email, role, created_at;`;
  const { rows } = await pool.query(query, [name, email, role, id]);
  return rows[0];
}

//Delete user
export const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}
