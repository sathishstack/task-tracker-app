const reminderService = require("../services/reminderService");

const create = async (req, res) => {
    const reminder = await reminderService.createReminder(
        req.user.id,
        req.body
    ).catch(err => { res.status(400); throw err; });
    res.status(201).json(reminder);
};

module.exports = { create };