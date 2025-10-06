import * as Authors from "../models/authorModel.js";

// Create author or multiple authors
export const createMultipleAuthors = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Si se envía un array JSON
      if (data.length === 0) {
        return res.status(400).json({ error: "El array no puede estar vacío" });
      }
      const authors = await Authors.createMultipleAuthors(data);
      return res.status(201).json({
        message: "Autores creados exitosamente",
        authors,
      });
    } else {
      // Si se envía un solo objeto
      const { name, lastname, nationality_id } = data;
      if (!name || !lastname || !nationality_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
      const author = await Authors.createAuthor(name, lastname, nationality_id);
      return res.status(201).json({
        message: "Autor creado exitosamente",
        author,
      });
    }
  } catch (error) {
    console.error("Error creando autor(es):", error);
    res.status(500).json({ error: "Error al crear autor(es)" });
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
        const { name, lastname, nationality_id } = req.body;
        const author = await Authors.updateAuthor(id, name, lastname, nationality_id);

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