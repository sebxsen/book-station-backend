import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", authenticate, authorize("Administrador"), userController.getUsers);

export default userRoutes;