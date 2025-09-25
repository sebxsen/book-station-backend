import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as authorController from "../controllers/authorController.js";

const authorRoutes = express.Router();

// Routes for users with roles "Administrador" and "Bibliotecario"
authorRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), authorController.getAllAuthors);
authorRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), authorController.getAuthorById);
authorRoutes.post("/create", authenticate, authorize("Administrador"), authorController.createAuthor);
authorRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), authorController.updateAuthor);
authorRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), authorController.deleteAuthor);

export default authorRoutes;