const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const { getStats } = require("../controllers/dashboardController");

router.use(protect);
router.get("/", getStats);

module.exports = router;