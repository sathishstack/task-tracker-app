const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
    const token = await registerUser(req.body);
    res.status(201).json({ token });
};

const login = async (req, res) => {
    const token = await loginUser(req.body);
    res.json({ token });
};

module.exports = { register, login };