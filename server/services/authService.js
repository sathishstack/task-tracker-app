const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return generateToken(user);
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return generateToken(user);
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = {
    registerUser,
    loginUser
};