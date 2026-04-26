const taskService = require("../services/taskService");

const create = async (req, res) => {
    try {
        const task = await taskService.createTask(req.user.id, req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user.id, req.query);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.user.id, req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            req.user.id,
            req.params.id,
            req.body
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.user.id, req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { create, getAll, getOne, update, remove };