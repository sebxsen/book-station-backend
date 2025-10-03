import * as Reasons from '../models/reasonsModel.js';
  
// Create a new reason
export const createReason = async (req, res) => {
    try {
        const {name} = req.body;
        const newReason = await Reasons.createReason(name);
        res.status(201).json(newReason);
    } catch (err) {
        res.status(500).json({err: "Error al crear la razón", details : err.message});
    }
};

// Get all reasons
export const getAllReasons = async (req, res) => {
    try {
        const reasons = await Reasons.getAllReasons();
        res.json(reasons);
    } catch (err) {
        res.status(500).json({err: "Error al obtener las razones", details: err.message})
    }
};

// Update reason
export const updateReason = async (req, res) => {
  try {
    const { id } = req.params;
    const { name} = req.body;
    const reason = await Reasons.updateReason(id, name);
    if (!reason) {
      return res.status(404).json({ error: "Razón no encontrada" });
    }
    res.json(reason);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la razón", details: err.message });
  }
};

// Delete reason
export const deleteReason = async (req, res) => {
  try {
    const { id } = req.params;
    const reason = await Reasons.deleteReason(id);
    if (!reason) {
      return res.status(404).json({ error: "Razón no encontrada" });
    }
    res.json(reason);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la razón", details: err.message });
  }
};