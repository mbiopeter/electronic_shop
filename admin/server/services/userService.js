const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (username, password) => {
    //check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }

    //compare password hashes
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
};

const registerUser = async (username, firstName, secondName, idNumber, phoneNumber) => {
    // Verify all required details are provided
    if (!username || !firstName || !secondName || !idNumber || !phoneNumber) {
        throw new Error('Provide all the required details');
    }
    //check if id number is an integer
    if (!Number.isInteger(idNumber)) {
        throw new Error('idNumber must be an integer');
    }
    //check if phone number is an integer
    if (!Number.isInteger(phoneNumber)) {
        throw new Error('phoneNumber must be an integer');
    }
    // Check if user already exists
    const existingUser = await User.findOne({ where: { idNumber } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(username, 10);

    // Create new user
    const newUser = await User.create({
        username,
        firstName,
        secondName,
        idNumber,
        phoneNumber,
        password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user: newUser };
};

const allUsers = async () => {
    try {
        // Fetch all users but the three fields
        const users = await User.findAll({
            attributes: {
                exclude: ['username','createdAt', 'updatedAt', 'password']
            }
        });

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

module.exports = {
    loginUser,
    registerUser,
    allUsers,
};
