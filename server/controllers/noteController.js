const noteService = require("../services/noteService");

const create = async (req, res) => {
    const note = await noteService.createNote(req.user.id, req.body).catch(err => { res.status(400); throw err; });
    res.status(201).json(note);
};

const getAll = async (req, res) => {
    const result = await noteService.getNotes(req.user.id, req.query);
    res.json(result);
};

const update = async (req, res) => {
    const note = await noteService.updateNote(
        req.user.id,
        req.params.id,
        req.body
    ).catch(err => { res.status(400); throw err; });
    
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    res.json(note);
};

const remove = async (req, res) => {
    const note = await noteService.deleteNote(req.user.id, req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    res.json({ message: "Note deleted" });
};

module.exports = { create, getAll, update, remove };