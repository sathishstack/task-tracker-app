const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const noteController = require("../controllers/noteController");

router.use(protect);

router.post("/", noteController.create);
router.get("/", noteController.getAll);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.remove);

module.exports = router;