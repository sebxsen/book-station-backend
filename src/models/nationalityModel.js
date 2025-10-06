import pool from "../db.js";

// Create a new nationality
export const createNationality = async (name) => {
    const query = `INSERT INTO nationalities (name) VALUES ($1) RETURNING id, name;`;
    const values = [name];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

// Create multiple nationalities
export const createMultipleNationalities = async (nationalities) => {
    if (!Array.isArray(nationalities) || nationalities.length === 0) {
        throw new Error("El array de nacionalidades está vacío o no es válido");
    }

    const values = [];
    const params = [];

    nationalities.forEach((nationality, index) => {
        values.push(`($${index + 1})`);
        params.push(nationality.name);
    });

    const query = `
        INSERT INTO nationalities (name)
        VALUES ${values.join(", ")}
        RETURNING id, name;
    `;

    const { rows } = await pool.query(query, params);
    return rows;
};

// Get all notionalities
export const getAllNationalities = async () => {
    const query = `SELECT id, name FROM nationalities ORDER BY name;`;
    const {rows} = await pool.query(query);
    return rows;
};

// Update nationality
export const updateNationality = async (id, name) => {
    const query = `UPDATE nationalities SET name=$1 WHERE id=$2 RETURNING id, name;`;
    const {rows} = await pool.query(query, [name, id]);
    return rows[0];
}

// Delete Nationality
export const deleteNationality = async (id) => {
    const query = `DELETE FROM nationalities WHERE id=$1 RETURNING id;`;
    const {rows} = await pool.query(query, [id]);
    return rows[0];
}