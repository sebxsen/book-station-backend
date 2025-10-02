import * as Penalties from "../models/penaltiesModel.js";

// Create new penalty
export const createPenalty = async (req, res) => {
  try {
    const { loan_id, reason_id, amount, description, state } = req.body;
    const newPenalty = await Penalties.createPenalty(loan_id, reason_id, amount, description, state);
    res.status(201).json(newPenalty);
  } catch (err) {
    res.status(500).json({ err: "Error al crear la penalización", details: err.message });
  }
};

// Get all penalties
export const getAllPenalties = async (req, res) => {
  try {
    const penalties = await Penalties.getAllPenalties();
    res.json(penalties);
  } catch (err) {
    res.status(500).json({ err: "Error al obtener penalizaciones", details: err.message });
  }
};

// Get penalty by id
export const getPenaltyById = async (req, res) => {
  try {
    const { id } = req.params;
    const penalty = await Penalties.getPenaltyById(id);
    if (!penalty) {
      return res.status(404).json({ err: "Penalización no encontrada" });
    }
    res.json(penalty);
  } catch (err) {
    res.status(500).json({ err: "Error al obtener penalización", details: err.message });
  }
};

// Update penalty
export const updatePenalty = async (req, res) => {
  try {
    const { id } = req.params;
    const { loan_id, reason_id, amount, description, state } = req.body;
    const penalty = await Penalties.updatePenalty(id, loan_id, reason_id, amount, description, state);
    if (!penalty) {
      return res.status(404).json({ err: "Penalización no encontrada" });
    }
    res.json(penalty);
  } catch (err) {
    res.status(500).json({ err: "Error al actualizar penalización", details: err.message });
  }
};

// Delete penalty
export const deletePenalty = async (req, res) => {
  try {
    const { id } = req.params;
    const penalty = await Penalties.deletePenalty(id);
    if (!penalty) {
      return res.status(404).json({ err: "Penalización no encontrada" });
    }
    res.json({ message: "Penalización eliminada" });
  } catch (err) {
    res.status(500).json({ err: "Error al eliminar penalización", details: err.message });
  }
};