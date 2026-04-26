const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// Health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running 🚀" });
});

module.exports = app;