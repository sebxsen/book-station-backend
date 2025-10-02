import pool from "../db.js";

// Create new penalty
export const createPenalty = async (loan_id, reason_id, amount, description, state) => {
  const query = `
    INSERT INTO penalties (loan_id, reason_id, amount, description, state)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, loan_id, reason_id, amount, description, state;
  `;
  const { rows } = await pool.query(query, [loan_id, reason_id, amount, description, state]);
  return rows[0];
};

// Get all penalties
export const getAllPenalties = async () => {
  const query = `
    SELECT id, loan_id, reason_id, amount, description, state
    FROM penalties
    ORDER BY id DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// get penalty by id
export const getPenaltyById = async (id) => {
  const query = `
    SELECT id, loan_id, reason_id, amount, description, state
    FROM penalties
    WHERE id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Update penalty
export const updatePenalty = async (id, loan_id, reason_id, amount, description, state) => {
  const query = `
    UPDATE penalties
    SET loan_id=$1, reason_id=$2, amount=$3, description=$4, state=$5
    WHERE id=$6
    RETURNING id, loan_id, reason_id, amount, description, state;
  `;
  const { rows } = await pool.query(query, [loan_id, reason_id, amount, description, state, id]);
  return rows[0];
};

// Delete penalty
export const deletePenalty = async (id) => {
  const query = `DELETE FROM penalties WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};