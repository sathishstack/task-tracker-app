const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: null
    },
    message: {
        type: String,
        required: true
    },
    remindAt: {
        type: Date,
        required: true,
        index: true
    },
    isTriggered: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true });

reminderSchema.index({ remindAt: 1, isTriggered: 1 });

module.exports = mongoose.model("Reminder", reminderSchema);