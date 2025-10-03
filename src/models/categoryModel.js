import pool from "../db.js";

// Create a new category
export const createCategory = async (name) => {
    const query =
    `INSERT INTO categories (name)
    VALUES ($1) RETURNING id, name;`;

    const values = [name];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

//Get all categories
export const getAllCategories = async () => {
    const query =
    `SELECT id, name FROM categories ORDER BY name;`;

    const { rows } = await pool.query(query);
    return rows;
}

// Update category
export const updateCategory = async (id, name) => {
    const query =
    `UPDATE categories SET name=$1 
    WHERE id=$2 RETURNING id, name;`;
    
    const {rows} = await pool.query(query, [name, id]);
    return rows[0];
}

// Delete category
export const deleteCategory = async (id) => {
    const query =
    `DELETE FROM categories WHERE id=$1 RETURNING id;`;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}