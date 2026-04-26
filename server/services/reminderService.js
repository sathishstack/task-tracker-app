const Reminder = require("../models/Reminder");

const createReminder = async (userId, data) => {
    return Reminder.create({ ...data, userId });
};

const getPendingReminders = async () => {
    return Reminder.find({
        isTriggered: false,
        remindAt: { $lte: new Date() }
    });
};

const markAsTriggered = async (id) => {
    return Reminder.findByIdAndUpdate(id, { isTriggered: true });
};

module.exports = {
    createReminder,
    getPendingReminders,
    markAsTriggered
};