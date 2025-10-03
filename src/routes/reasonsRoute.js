import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as reasonController from "../controllers/reasonsController.js";

const reasonRoutes = express.Router();

reasonRoutes.post("/create", authenticate, authorize("Administrador", "Bibliotecario"), reasonController.createReason);
reasonRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), reasonController.getAllReasons);
reasonRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), reasonController.updateReason);
reasonRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), reasonController.deleteReason);

export default reasonRoutes;