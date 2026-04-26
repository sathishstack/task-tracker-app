const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        text: true // for search
    },
    content: {
        type: String,
        default: "",
        text: true // for search
    },
    tags: [
        {
            type: String,
            index: true
        }
    ]
}, { timestamps: true });

// 🔥 Text index (critical for search)
noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);