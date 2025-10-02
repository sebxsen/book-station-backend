import pool from "../db.js";

// Crete new loan
export const createLoan = async (user_id, copy_id, loan_date, deadline, return_date, state) => {
  const query = `
    INSERT INTO loans (user_id, copy_id, loan_date, deadline, return_date, state)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, user_id, copy_id, loan_date, deadline, return_date, state;
  `;
  const { rows } = await pool.query(query, [user_id, copy_id, loan_date, deadline, return_date, state]);
  return rows[0];
};

// Get all loans
export const getAllLoans = async () => {
  const query = `
    SELECT id, user_id, copy_id, loan_date, deadline, return_date, state
    FROM loans
    ORDER BY loan_date DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

//Get loan by id
export const getLoanById = async (id) => {
  const query = `
    SELECT id, user_id, copy_id, loan_date, deadline, return_date, state
    FROM loans
    WHERE id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Update loan
export const updateLoan = async (id, user_id, copy_id, loan_date, deadline, return_date, state) => {
  const query = `
    UPDATE loans
    SET user_id=$1, copy_id=$2, loan_date=$3, deadline=$4, return_date=$5, state=$6
    WHERE id=$7
    RETURNING id, user_id, copy_id, loan_date, deadline, return_date, state;
  `;
  const { rows } = await pool.query(query, [user_id, copy_id, loan_date, deadline, return_date, state, id]);
  return rows[0];
};

// Delete loan
export const deleteLoan = async (id) => {
  const query = `DELETE FROM loans WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};