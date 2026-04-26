const Note = require("../models/Note");

const createNote = async (userId, data) => {
    return Note.create({ ...data, userId });
};

const getNotes = async (userId, query) => {
    const { search, tag, page = 1, limit = 10 } = query;

    const filter = { userId };

    // 🔍 Text search
    if (search) {
        filter.$text = { $search: search };
    }

    // 🏷️ Tag filter
    if (tag) {
        filter.tags = tag;
    }

    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
        Note.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean(),
        Note.countDocuments(filter)
    ]);

    return {
        data: notes,
        meta: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        }
    };
};

const updateNote = async (userId, noteId, data) => {
    return Note.findOneAndUpdate(
        { _id: noteId, userId },
        data,
        { new: true }
    );
};

const deleteNote = async (userId, noteId) => {
    return Note.findOneAndDelete({ _id: noteId, userId });
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};