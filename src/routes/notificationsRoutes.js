import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as notificationsController from "../controllers/notificationsController.js";

const notificationsRoutes = express.Router();

notificationsRoutes.get("/", authenticate, authorize("Administrador", "Bibliotecario"), notificationsController.getAllNotifications);
notificationsRoutes.get("/:id", authenticate, authorize("Administrador", "Bibliotecario"), notificationsController.getNotificationById);
notificationsRoutes.post("/create", authenticate, authorize("Administrador"), notificationsController.createNotification);
notificationsRoutes.put("/edit/:id", authenticate, authorize("Administrador"), notificationsController.updateNotification);
notificationsRoutes.delete("/delete/:id", authenticate, authorize("Administrador"), notificationsController.deleteNotification);

export default notificationsRoutes;