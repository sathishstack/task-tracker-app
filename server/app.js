const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: false // disable CSP to avoid blocking frontend inline scripts for now
}));

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/dashboard", dashboardRoutes);

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running 🚀" });
});

// Centralized error handler should be last
app.use(errorHandler);

module.exports = app;