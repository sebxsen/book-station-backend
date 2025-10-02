import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import nationalityRoutes from "./routes/nationalityRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import copieRoutes from "./routes/copiesRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import loansRoutes from "./routes/loansRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/nationalities", nationalityRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/copies", copieRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/loans", loansRoutes);


// Test DB connection
pool.query("SELECT NOW()")
  .then(res => console.log("Conectado a la BD:", res.rows[0]))
  .catch(err => console.error("Error de conexión:", err));

// Run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
