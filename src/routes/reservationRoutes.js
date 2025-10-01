import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as reservationsController from "../controllers/reservationsController.js"

const reservationsRoutes = express.Router();

// Routes for users with roles "Administrador" and "Bibliotecario"
reservationsRoutes.get(
  "/",
  authenticate,
  authorize("Administrador", "Bibliotecario"),
  reservationsController.getAllReservations
);
reservationsRoutes.get(
  "/:id",
  authenticate,
  authorize("Administrador", "Bibliotecario"),
  reservationsController.getReservationById
);
reservationsRoutes.post(
  "/create",
  authenticate,
  authorize("Administrador"),
  reservationsController.createReservation
);
reservationsRoutes.put(
  "/edit/:id",
  authenticate,
  authorize("Administrador", "Bibliotecario"),
  reservationsController.updateReservation
);
reservationsRoutes.delete(
  "/delete/:id",
  authenticate,
  authorize("Administrador", "Bibliotecario"),
  reservationsController.deleteReservation
);

export default reservationsRoutes;
