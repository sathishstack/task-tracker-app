const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middlewares/authMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running 🚀" });
});

module.exports = app;