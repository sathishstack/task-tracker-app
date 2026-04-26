const Task = require("../models/Task");

const createTask = async (userId, data) => {
    return Task.create({ ...data, userId });
};

const getTasks = async (userId, query) => {
    const {
        status,
        priority,
        from,
        to,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc"
    } = query;

    // 🔎 Build filter
    const filter = { userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (from || to) {
        filter.dueDate = {};
        if (from) filter.dueDate.$gte = new Date(from);
        if (to) filter.dueDate.$lte = new Date(to);
    }

    const safeLimit = Math.min(parseInt(limit) || 10, 50);
    const safePage = Math.max(parseInt(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    // 🔃 Sorting
    const sort = {
        [sortBy]: order === "asc" ? 1 : -1
    };

    // ⚡ Query (lean for performance)
    const [tasks, total] = await Promise.all([
        Task.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(safeLimit)
            .lean(),
        Task.countDocuments(filter)
    ]);

    return {
        data: tasks,
        meta: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        }
    };
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