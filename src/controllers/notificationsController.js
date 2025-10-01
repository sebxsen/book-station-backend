import * as Notifications from "../models/notificationsModel.js";

// Crear notificación
export const createNotification = async (req, res) => {
  try {
    const { user_id, message, shipping_date, state } = req.body;
    const newNotification = await Notifications.createNotification(
      user_id,
      message,
      shipping_date,
      state
    );
    res.status(201).json(newNotification);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al crear la notificación", details: err.message });
  }
};

// Obtener todas las notificaciones
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.getAllNotifications();
    res.json(notifications);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al obtener notificaciones", details: err.message });
  }
};

// Obtener notificación por id
export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications.getNotificationById(id);
    if (!notification) {
      return res.status(404).json({ err: "Notificación no encontrada" });
    }
    res.json(notification);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al obtener notificación", details: err.message });
  }
};

// Actualizar notificación
export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, message, shipping_date, state } = req.body;
    const notification = await Notifications.updateNotification(
      id,
      user_id,
      message,
      shipping_date,
      state
    );
    if (!notification) {
      return res.status(404).json({ err: "Notificación no encontrada" });
    }
    res.json(notification);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al actualizar notificación", details: err.message });
  }
};

// Eliminar notificación
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications.deleteNotification(id);
    if (!notification) {
      return res.status(404).json({ err: "Notificación no encontrada" });
    }
    res.json({ message: "Notificación eliminada" });
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al eliminar notificación", details: err.message });
  }
};
