import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as loansController from "../controllers/loansController.js";

const loansRoutes = express.Router();

loansRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), loansController.getAllLoans);
loansRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), loansController.getLoanById);
loansRoutes.post("/create", authenticate, authorize("Administrador", "Bibliotecario"), loansController.createLoan);
loansRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), loansController.updateLoan);
loansRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), loansController.deleteLoan);

export default loansRoutes;