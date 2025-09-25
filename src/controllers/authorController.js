import * as Authors from "../models/authorModel.js";

// Create author
export const createAuthor = async (req, res) => {
    try {
        const { name, lastname, nacionality_id } = req.body;
        const author = await Authors.createAuthor(name, lastname, nacionality_id);
        res.status(201).json(author);
    } catch (err) {
        res.status(500).json({ error: "Error al crear autor", details: err.message });
    }
};

// Get all authors with nationality name
export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Authors.getAllAuthors();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener autores", details: err.message });
    }
};

// Get author by ID
export const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Authors.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.json(author);

    } catch (err) {
        res.status(500).json({ error: "Error al obtener autor", details: err.message });
    }
};

// Update author
export const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, nacionality_id } = req.body;
        const author = await Authors.updateAuthor(id, name, lastname, nacionality_id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.json(author);

    } catch (err) {
        res.status(500).json({ error: "Error al actualizar autor", details: err.message });
    }
};

// Delete author
export const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Authors.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.json({ message: "Autor eliminado" });

    } catch (err) {
        res.status(500).json({ error: "Error al eliminar autor", details: err.message });
    }
};