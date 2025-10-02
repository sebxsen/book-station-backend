import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as penaltiesController from "../controllers/penaltiesController.js";

const penaltiesRoutes = express.Router();

penaltiesRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), penaltiesController.getAllPenalties);
penaltiesRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), penaltiesController.getPenaltyById);
penaltiesRoutes.post("/create", authenticate, authorize("Administrador", "Bibliotecario"), penaltiesController.createPenalty);
penaltiesRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), penaltiesController.updatePenalty);
penaltiesRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), penaltiesController.deletePenalty);

export default penaltiesRoutes;