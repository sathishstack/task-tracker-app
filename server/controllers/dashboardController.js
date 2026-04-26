const Task = require("../models/Task");
const Reminder = require("../models/Reminder");

const getStats = async (req, res) => {
    const userId = req.user.id;

    const [total, completed, upcomingReminders] = await Promise.all([
        Task.countDocuments({ userId }),
        Task.countDocuments({ userId, status: "done" }),
        Reminder.find({
            userId,
            isTriggered: false,
            remindAt: { $gte: new Date() }
        })
            .sort({ remindAt: 1 })
            .limit(5)
            .lean()
    ]);

    res.json({
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: total - completed,
        upcomingReminders
    });
};

module.exports = { getStats };