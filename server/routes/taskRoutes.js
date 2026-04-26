const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

router.use(protect); // all routes protected

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", taskController.getOne);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

module.exports = router;