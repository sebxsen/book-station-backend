import pool from "../db.js";

// Create a new copies
export const createCopy = async (inventory_code, state, ubication, book_id) => {
  const query = `
    INSERT INTO copies (inventory_code, state, ubication, book_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, inventory_code, state, ubication, book_id;
  `;

  const values = [inventory_code, state, ubication, book_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Get copy by id with book information
export const getCopyById = async (id) => {
  const query = `
    SELECT cp.id, cp.inventory_code, cp.state, cp.ubication,
           b.title AS book_title, b.id AS book_id
    FROM copies cp
    JOIN books b ON cp.book_id = b.id
    WHERE cp.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Get all copies with book information
export const getAllCopies = async () => {
  const query = `
    SELECT cp.id, cp.inventory_code, cp.state, cp.ubication,
           b.title AS book_title, b.id AS book_id
    FROM copies cp
    JOIN books b ON cp.book_id = b.id
    ORDER BY cp.id DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Update copies
export const updateCopy = async (
  id,
  inventory_code,
  state,
  ubication,
  book_id
) => {
  const query = `
    UPDATE copies
    SET inventory_code=$1, state=$2, ubication=$3, book_id=$4
    WHERE id=$5
    RETURNING id, inventory_code, state, ubication, book_id;
  `;
  const { rows } = await pool.query(query, [
    inventory_code,
    state,
    ubication,
    book_id,
    id,
  ]);
  return rows[0];
};

// Delete cipies
export const deleteCopy = async (id) => {
  const query = `DELETE FROM copies WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
