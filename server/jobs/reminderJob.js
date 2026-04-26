const cron = require("node-cron");
const {
    getPendingReminders,
    markAsTriggered
} = require("../services/reminderService");

const startReminderJob = () => {
    // runs every minute
    cron.schedule("* * * * *", async () => {
        console.log("⏱ Checking reminders...");

        const reminders = await getPendingReminders();

        for (const reminder of reminders) {
            console.log(`🔔 Reminder: ${reminder.message}`);

            // mark as triggered
            await markAsTriggered(reminder._id);
        }
    });
};

module.exports = startReminderJob;