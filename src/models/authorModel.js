import pool from "../db.js";

// Create a new author
export const createAuthor = async (name, lastname, nacionality_id) => {
    const query = 
    `INSERT INTO authors (name, lastname, nacionality_id) 
    VALUES ($1, $2, $3) 
    RETURNING id, name, lastname, nacionality_id;`;

    const values = [name, lastname, nacionality_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

// Get author by ID
export const getAuthorById = async (id) => {
    const query = 
    `SELECT * FROM authors WHERE id=$1;`;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

// Get all authors
export const getAllAuthors = async () => {
    const query = 
    `SELECT id, name, lastname, nacionality_id
    FROM authors ORDER BY id DESC;`;

    const { rows } = await pool.query(query);
    return rows;
}

// Get all authors with nacionality name
export const getAllAuthorsWithNationality = async () => {
    const query = 
    `SELECT a.id, a.name, a.lastname, n.name AS nacionality
    FROM authors a
    JOIN nacionalities n ON a.nacionality_id = n.id
    ORDER BY a.id DESC;`;
    const { rows } = await pool.query(query);
    return rows;
};

// Update author
export const updateAuthor = async (id, name, lastname, nacionality_id) => {
    const query = 
    `UPDATE authors 
    SET name=$1, lastname=$2, nacionality_id=$3 WHERE id=$4
    RETURNING id, name, lastname, nacionality_id;`;

    const { rows } = await pool.query(query, [name, lastname, nacionality_id, id]);
    return rows[0];
}

// Delete author
export const deleteAuthor = async (id) => {
    const query = 
    `DELETE FROM authors WHERE id=$1 RETURNING id;`;
    
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}