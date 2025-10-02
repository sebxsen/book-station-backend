import * as Loans from "../models/loansModel.js";

// Crete new loan
export const createLoan = async (req, res) => {
  try {
    const { user_id, copy_id, loan_date, deadline, return_date, state } = req.body;
    const newLoan = await Loans.createLoan(user_id, copy_id, loan_date, deadline, return_date, state);
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(500).json({ err: "Error al crear el préstamo", details: err.message });
  }
};

// Get all loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loans.getAllLoans();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ err: "Error al obtener préstamos", details: err.message });
  }
};

// Get loan by id
export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loans.getLoanById(id);
    if (!loan) {
      return res.status(404).json({ err: "Préstamo no encontrado" });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ err: "Error al obtener préstamo", details: err.message });
  }
};

// Update loan
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, copy_id, loan_date, deadline, return_date, state } = req.body;
    const loan = await Loans.updateLoan(id, user_id, copy_id, loan_date, deadline, return_date, state);
    if (!loan) {
      return res.status(404).json({ err: "Préstamo no encontrado" });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ err: "Error al actualizar préstamo", details: err.message });
  }
};

// Delete loan
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loans.deleteLoan(id);
    if (!loan) {
      return res.status(404).json({ err: "Préstamo no encontrado" });
    }
    res.json({ message: "Préstamo eliminado" });
  } catch (err) {
    res.status(500).json({ err: "Error al eliminar préstamo", details: err.message });
  }
};