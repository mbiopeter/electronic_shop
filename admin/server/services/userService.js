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
        throw new Error(' all the fields are required !');
    }
    //id number varidation
    if (!/^\d{8,}$/.test(idNumber.toString())) {
        throw new Error('Invalid ID number');
    }
    //phone number validation
    if (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10) {
        throw new Error('Invalid phone number!');
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
        password: hashedPassword,
        roles: []
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
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        //delete a user with the matching userid
        const user = await User.destroy({ where: { id: userId } });
        if (!user) {
            throw new Error('Error removing the user, try again');
        }
    } catch (error) {
        throw error;
    }
}

const oneUser = async (userId) => {
    try {
        // get a user with the matching userId
        const user = await User.findOne({
            attributes: {
                exclude: ['username', 'createdAt', 'updatedAt', 'password']
            },
            where: { id: userId }
        });

        if (!user) {
            throw new Error('User not found in our records');
        }

        return user; // Return the user if found
    } catch (err) {
        throw err; // Handle or log the error
    }
};


module.exports = {
    loginUser,
    registerUser,
    allUsers,
    deleteUser,
    oneUser
};
