// /controllers/userController.js
const { loginUser } = require('../services/userService');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token, user } = await loginUser(username, password);
        res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, username: user.username },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    login,
};
