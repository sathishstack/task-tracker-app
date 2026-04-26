const cron = require("node-cron");
const {
    getPendingReminders,
    markAsTriggered
} = require("../services/reminderService");
const sendEmail = require("../utils/emailService");
const User = require("../models/User");

const startReminderJob = () => {
    // runs every minute
    cron.schedule("* * * * *", async () => {
        const reminders = await getPendingReminders();

        for (const reminder of reminders) {
            console.log(`🔔 Reminder: ${reminder.message}`);

            // 🔍 Get user email
            const user = await User.findById(reminder.userId);

            if (user?.email) {
                await sendEmail(
                    user.email,
                    "Reminder Notification",
                    reminder.message
                );
            }

            await markAsTriggered(reminder._id);
        }
    });
};

module.exports = startReminderJob;