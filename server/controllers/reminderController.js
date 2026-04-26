const reminderService = require("../services/reminderService");

const create = async (req, res) => {
    try {
        const reminder = await reminderService.createReminder(
            req.user.id,
            req.body
        );
        res.status(201).json(reminder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { create };