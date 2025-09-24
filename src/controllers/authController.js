import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as Users from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "shhhh-its-a-secret";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Verify if user already exists
    const existing = await Users.findUserByEmail(email);
    if (existing)
      return res.status(400).json({ error: "Es correo ya esta registrado" });

    const newUser = await Users.createUser( name, email, password, "Administrador");

    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al registrar el usuario", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    //Compare passwords
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    //Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role }, //Role come from enum in the database
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al iniciar sesión", details: err.message });
  }
};
