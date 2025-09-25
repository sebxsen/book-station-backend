import * as Nationalities from "../models/nationalityModel.js";

// Create a new nationality
export const createNationality = async (req, res) => {
    try {
        const {name} = req.body;
        const newNationality = await Nationalities.createNationality(name);
        res.status(201).json(newNationality);
    } catch (err) {
        res.status(500).json({err: "Error al crear la nacionalidad", deatils : err.message});
    }
}

// Get all nationalities
export const getAllNationalities = async (req, res) => {
    try {
        const nationalities = await Nationalities.getAllNationalities();
        res.json(nationalities);
    } catch (err) {
        res.status(500).json({err: "Error al obtener las nacionalidades", datails: err.message})
    }
}

// Update nationality
export const updateNationality = async (req, res) => {
  try {
    const { id } = req.params;
    const { name} = req.body;
    const nationality = await Nationalities.updateNationality(id, name);
    if (!nationality) {
      return res.status(404).json({ error: "Nacionalidad no encontrada" });
    }
    res.json(nationality);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la nacionalidad", details: err.message });
  }
}

// Delete nationality
export const deleteNationality = async (req, res) => {
  try {
    const { id } = req.params;
    const nationality = await Nationalities.deleteNationality(id);
    if (!nationality) {
      return res.status(404).json({ error: "Nacionalidad no encontrada" });
    }
    res.json({ message: "Nacionalidad Eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la nacionalidad", details: err.message });
  }
}