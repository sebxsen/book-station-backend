import pool from "../db.js";

// Create a new author
export const createAuthor = async (name, lastname, nationality_id) => {
    const query = 
    `INSERT INTO authors (name, lastname, nationality_id) 
    VALUES ($1, $2, $3) 
    RETURNING id, name, lastname, nationality_id;`;

    const values = [name, lastname, nationality_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

// Create multiple authors
export const createMultipleAuthors = async (authors) => {
    const values = [];
    const params = [];

    authors.forEach((author, index) => {
        const i = index * 3;
        values.push(`($${i + 1}, $${i + 2}, $${i + 3})`);
        params.push(author.name, author.lastname, author.nationality_id);
    });

    const query = `
        INSERT INTO authors (name, lastname, nationality_id)
        VALUES ${values.join(", ")}
        RETURNING id, name, lastname, nationality_id;
    `;

    const { rows } = await pool.query(query, params);
    return rows;
};

// Get author by ID
export const getAuthorById = async (id) => {
    const query = 
    `SELECT * FROM authors WHERE id=$1;`;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

// Get all authors with nationality name
export const getAllAuthors = async () => {
    const query = 
    `SELECT a.id, a.name, a.lastname, n.name AS nationality
    FROM authors a
    JOIN nationalities n ON a.nationality_id = n.id
    ORDER BY a.id DESC;`;
    const { rows } = await pool.query(query);
    return rows;
};

// Update author
export const updateAuthor = async (id, name, lastname, nationality_id) => {
    const query = 
    `UPDATE authors 
    SET name=$1, lastname=$2, nationality_id=$3 WHERE id=$4
    RETURNING id, name, lastname, nationality_id;`;

    const { rows } = await pool.query(query, [name, lastname, nationality_id, id]);
    return rows[0];
}

// Delete author
export const deleteAuthor = async (id) => {
    const query = 
    `DELETE FROM authors WHERE id=$1 RETURNING id;`;
    
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}