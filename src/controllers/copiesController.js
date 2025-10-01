import * as Copies from "../models/copiesModel.js"

// Create a new copies
export const createCopy = async (req, res) => {
  try {
    const { inventory_code, state, ubication, book_id } = req.body;

    const newCopy = await Copies.createCopy(
      inventory_code,
      state,
      ubication,
      book_id
    );

    res.status(201).json(newCopy);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al crear la copia", details: err.message });
  }
};

// Get copy by id with book information
export const getAllCopies = async (req, res) => {
  try {
    const copies = await Copies.getAllCopies();
    res.json(copies);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al obtener copias", details: err.message });
  }
};

// Get all copies with book information
export const getCopyById = async (req, res) => {
  try {
    const { id } = req.params;
    const copy = await Copies.getCopyById(id);

    if (!copy) {
      return res.status(404).json({ err: "Copia no encontrada" });
    }

    res.json(copy);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al obtener copia", details: err.message });
  }
};

// Update copies
export const updateCopy = async (req, res) => {
  try {
    const { id } = req.params;
    const { inventory_code, state, ubication, book_id } = req.body;

    const copy = await Copies.updateCopy(
      id,
      inventory_code,
      state,
      ubication,
      book_id
    );

    if (!copy) {
      return res.status(404).json({ err: "Copia no encontrada" });
    }

    res.json(copy);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al actualizar copia", details: err.message });
  }
};

// Delete copies
export const deleteCopy = async (req, res) => {
  try {
    const { id } = req.params;
    const copy = await Copies.deleteCopy(id);

    if (!copy) {
      return res.status(404).json({ err: "Copia no encontrada" });
    }

    res.json({ message: "Copia eliminada" });
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al eliminar copia", details: err.message });
  }
};
