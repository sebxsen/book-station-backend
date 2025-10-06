import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as copiesController from "../controllers/copiesController.js";

const copiesRoutes = express.Router();

// Routes for users with roles "Administrador" and "Bibliotecario"
copiesRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), copiesController.getAllCopies);
copiesRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), copiesController.getCopyById);
copiesRoutes.post("/create", authenticate, authorize("Administrador"), copiesController.createCopy);
copiesRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), copiesController.updateCopy);
copiesRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), copiesController.deleteCopy);

export default copiesRoutes;
