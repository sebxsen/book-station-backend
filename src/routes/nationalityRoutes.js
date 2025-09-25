import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as nationalityController from "../controllers/nationalityController.js";


const nationalityRoutes = express.Router();

nationalityRoutes.post("/create", authenticate, authorize("Administrador"), nationalityController.createNationality);
nationalityRoutes.get("/", authenticate, authorize("Administrador"), nationalityController.getAllNationalities);
nationalityRoutes.put("/edit/:id", authenticate, authorize("Administrador"), nationalityController.updateNationality);
nationalityRoutes.delete("/delete/:id", authenticate, authorize("Administrador"), nationalityController.deleteNationality);

export default nationalityRoutes;