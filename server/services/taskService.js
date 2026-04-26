const Task = require("../models/Task");

const createTask = async (userId, data) => {
    return Task.create({ ...data, userId });
};

const getTasks = async (userId, query) => {
    const filter = { userId };

    // Optional filters (basic; advanced comes Day 4)
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;

    return Task.find(filter).sort({ createdAt: -1 });
};

const getTaskById = async (userId, taskId) => {
    return Task.findOne({ _id: taskId, userId });
};

const updateTask = async (userId, taskId, data) => {
    return Task.findOneAndUpdate(
        { _id: taskId, userId },
        data,
        { new: true }
    );
};

const deleteTask = async (userId, taskId) => {
    return Task.findOneAndDelete({ _id: taskId, userId });
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};