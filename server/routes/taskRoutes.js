const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const protect = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error(errors.array()[0].msg);
        err.status = 400;
        return next(err);
    }
    next();
};

router.use(protect); // all routes protected

const taskValidation = [
    body("title").notEmpty().withMessage("Task title is required"),
    body("priority").optional().isIn(['low', 'medium', 'high']).withMessage("Invalid priority"),
    validate
];

router.post("/", taskValidation, taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", taskController.getOne);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

module.exports = router;