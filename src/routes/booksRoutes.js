import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as booksController from "../controllers/booksController.js";

const bookRoutes = express.Router();

// Routes for users with roles "Administrador" and "Bibliotecario"
bookRoutes.get("/", booksController.getAllBooks);
bookRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), booksController.getBookById);
bookRoutes.post("/create", authenticate, authorize("Administrador"), booksController.createMultipleBooks);
bookRoutes.put("/edit/:id", authenticate, authorize("Administrador", "Bibliotecario"), booksController.updateBook);
bookRoutes.delete("/delete/:id", authenticate, authorize("Administrador", "Bibliotecario"), booksController.deleteBook);

export default bookRoutes;
