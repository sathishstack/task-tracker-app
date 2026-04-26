const noteService = require("../services/noteService");

const create = async (req, res) => {
    try {
        const note = await noteService.createNote(req.user.id, req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await noteService.getNotes(req.user.id, req.query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const note = await noteService.updateNote(
            req.user.id,
            req.params.id,
            req.body
        );
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const note = await noteService.deleteNote(req.user.id, req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { create, getAll, update, remove };