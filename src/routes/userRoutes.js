import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", authenticate, authorize("Administrador"), userController.getAllUsers);
userRoutes.get("/:email", authenticate, authorize("Administrador"), userController.getUserByEmail);
userRoutes.put("/edit/:id", authenticate, authorize("Administrador"), userController.updateUser);
userRoutes.delete("/delete/:id", authenticate, authorize("Administrador"), userController.deleteUser);

export default userRoutes;