import * as Reservations from "../models/reservationsModel.js";

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { user_id, copy_id, reservation_date, state } = req.body;

    const newReservation = await Reservations.createReservation(
      user_id,
      copy_id,
      reservation_date,
      state
    );

    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({
      error: "Error al crear la reservación",
      details: err.message,
    });
  }
};

// Get all reservations with user and copy details
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservations.getAllReservations();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener las reservaciones",
      details: err.message,
    });
  }
};

// Get reservation by ID with user and copy deatils
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservations.getReservationById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener la reservación",
      details: err.message,
    });
  }
};

// Update reservation
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, copy_id, reservation_date, state } = req.body;

    const reservation = await Reservations.updateReservation(
      id,
      user_id,
      copy_id,
      reservation_date,
      state
    );

    if (!reservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({
      error: "Error al actualizar la reservación",
      details: err.message,
    });
  }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservations.deleteReservation(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json({ message: "Reservación eliminada correctamente" });
  } catch (err) {
    res.status(500).json({
      error: "Error al eliminar la reservación",
      details: err.message,
    });
  }
};
