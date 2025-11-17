const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// REGISTER — Admin Only
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin only" });
        }

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        console.log("user", user)
        if (!user)
            return res.status(404).json({ message: "Invalid email or password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid email or password" });

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
