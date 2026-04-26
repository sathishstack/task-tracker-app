const taskService = require("../services/taskService");

const create = async (req, res) => {
    const task = await taskService.createTask(req.user.id, req.body).catch(err => { res.status(400); throw err; });
    res.status(201).json(task);
};

const getAll = async (req, res) => {
    const result = await taskService.getTasks(req.user.id, req.query);
    res.json(result);
};

const getOne = async (req, res) => {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.json(task);
};

const update = async (req, res) => {
    const task = await taskService.updateTask(
        req.user.id,
        req.params.id,
        req.body
    ).catch(err => { res.status(400); throw err; });
    
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.json(task);
};

const remove = async (req, res) => {
    const task = await taskService.deleteTask(req.user.id, req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.json({ message: "Task deleted" });
};

module.exports = { create, getAll, getOne, update, remove };