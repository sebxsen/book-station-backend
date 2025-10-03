import pool from "../db.js";

// Create a new reason
export const createReason = async (name) => {
    const query =
    `INSERT INTO reasons (name)
    VALUES ($1) RETURNING id, name;`;

    const values = [name];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

//Get all reasons
export const getAllReasons = async () => {
    const query =
    `SELECT id, name FROM reasons ORDER BY name;`;

    const { rows } = await pool.query(query);
    return rows;
}

// Update reason
export const updateReason = async (id, name) => {
    const query =
    `UPDATE reasons SET name=$1 
    WHERE id=$2 RETURNING id, name;`;
    
    const {rows} = await pool.query(query, [name, id]);
    return rows[0];
}

// Delete reason
export const deleteReason = async (id) => {
    const query =
    `DELETE FROM reasons WHERE id=$1 RETURNING id;`;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}