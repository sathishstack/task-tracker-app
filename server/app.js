const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/reminders", reminderRoutes);

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running 🚀" });
});

module.exports = app;