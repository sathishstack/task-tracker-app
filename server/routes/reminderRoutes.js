const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const reminderController = require("../controllers/reminderController");

router.use(protect);

router.post("/", reminderController.create);

module.exports = router;