import * as Categories from '../models/categoryModel.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const newCategory = await Categories.createCategory(name);
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({err: "Error al crear la categoría", details : err.message});
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.getAllCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).json({err: "Error al obtener las categorías", details: err.message})
    }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name} = req.body;
    const category = await Categories.updateCategory(id, name);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la categoría", details: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.deleteCategory(id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la categoría", details: err.message });
  }
};