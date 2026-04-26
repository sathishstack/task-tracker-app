require("dotenv").config();

const app = require("./server/app");
const connectDB = require("./server/config/db");
const startReminderJob = require("./server/jobs/reminderJob");

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB().then(() => {
    startReminderJob();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
