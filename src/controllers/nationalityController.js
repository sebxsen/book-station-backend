import * as Nationalities from "../models/nationalityModel.js";

// Create a new nationality
export const createMultipleNationalities = async (req, res) => {
  try {
    const data = req.body;

    // Si envían un array
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return res.status(400).json({ error: "El array no puede estar vacío" });
      }

      const nationalities = await Nationalities.createMultipleNationalities(data);
      return res.status(201).json({
        message: "Nacionalidades creadas exitosamente",
        nationalities,
      });
    } 
    // Si envían un solo objeto
    else {
      const { name } = data;
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El campo 'name' es obligatorio" });
      }

      const nationality = await Nationalities.createNationality(name);
      return res.status(201).json({
        message: "Nacionalidad creada exitosamente",
        nationality,
      });
    }
  } catch (error) {
    console.error("Error creando nacionalidad(es):", error);
    res.status(500).json({ error: "Error al crear nacionalidad(es)" });
  }
};

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