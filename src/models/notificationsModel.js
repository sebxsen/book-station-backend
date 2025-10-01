import pool from "../db.js";

// Crear notificación
export const createNotification = async (user_id, message, shipping_date, state) => {
  const query = `
    INSERT INTO notifications (user_id, message, shipping_date, state)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, message, shipping_date, state;
  `;
  const { rows } = await pool.query(query, [user_id, message, shipping_date, state]);
  return rows[0];
};

// Obtener todas las notificaciones
export const getAllNotifications = async () => {
  const query = `SELECT id, user_id, message, shipping_date, state FROM notifications ORDER BY shipping_date DESC;`;
  const { rows } = await pool.query(query);
  return rows;
};

// Obtener notificación por id
export const getNotificationById = async (id) => {
  const query = `SELECT id, user_id, message, shipping_date, state FROM notifications WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Actualizar notificación
export const updateNotification = async (id, user_id, message, shipping_date, state) => {
  const query = `
    UPDATE notifications
    SET user_id=$1, message=$2, shipping_date=$3, state=$4
    WHERE id=$5
    RETURNING id, user_id, message, shipping_date, state;
  `;
  const { rows } = await pool.query(query, [user_id, message, shipping_date, state, id]);
  return rows[0];
};

// Eliminar notificación
export const deleteNotification = async (id) => {
  const query = `DELETE FROM notifications WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};