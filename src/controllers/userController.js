import * as Users from "../models/userModel.js";

// Listar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios", details: err.message });
  }
};