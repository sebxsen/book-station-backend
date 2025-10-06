import * as Categories from '../models/categoryModel.js';

// Create a new category
export const createMultipleCategories = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return res.status(400).json({ error: "El array no puede estar vacío" });
      }

      const categories = await Categories.createMultipleCategories(data);
      return res.status(201).json({
        message: "Categorías creadas exitosamente",
        categories,
      });
    } else {
      const { name } = data;
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El campo 'name' es obligatorio" });
      }

      const category = await Categories.createCategory(name);
      return res.status(201).json({
        message: "Categoría creada exitosamente",
        category,
      });
    }
  } catch (error) {
    console.error("Error creando categoría(s):", error);
    res.status(500).json({ error: "Error al crear categoría(s)" });
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