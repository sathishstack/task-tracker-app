const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
        index: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        index: true
    },
    dueDate: {
        type: Date,
        index: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);