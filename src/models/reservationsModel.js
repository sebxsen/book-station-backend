import pool from "../db.js";

// Create a new reservation
export const createReservation = async (
  user_id,
  copy_id,
  reservation_date,
  state
) => {
  const query = `
    INSERT INTO reservations (user_id, copy_id, reservation_date, state)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, copy_id, reservation_date, state;
  `;
  const values = [user_id, copy_id, reservation_date, state];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Get all reservations with user and copy details
export const getAllReservations = async () => {
  const query = `
    SELECT r.id, r.user_id, u.name AS user_name, r.copy_id, c.inventory_code,
           r.reservation_date, r.state
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN copies c ON r.copy_id = c.id
    ORDER BY r.reservation_date DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Get reservation by ID with user and copy deatils
export const getReservationById = async (id) => {
  const query = `
    SELECT r.id, r.user_id, u.name AS user_name, r.copy_id, c.inventory_code,
           r.reservation_date, r.state
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN copies c ON r.copy_id = c.id
    WHERE r.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Update reservation
export const updateReservation = async (
  id,
  user_id,
  copy_id,
  reservation_date,
  state
) => {
  const query = `
    UPDATE reservations
    SET user_id=$1, copy_id=$2, reservation_date=$3, state=$4
    WHERE id=$5
    RETURNING id, user_id, copy_id, reservation_date, state;
  `;
  const values = [user_id, copy_id, reservation_date, state, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Delete reservation
export const deleteReservation = async (id) => {
  const query = `
    DELETE FROM reservations
    WHERE id=$1
    RETURNING id;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
