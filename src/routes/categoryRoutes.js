import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as categoryController from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.post("/create", authenticate, authorize("Administrador", "Bibliotecario"), categoryController.createMultipleCategories);
categoryRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), categoryController.updateCategory);
categoryRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), categoryController.deleteCategory);

export default categoryRoutes;