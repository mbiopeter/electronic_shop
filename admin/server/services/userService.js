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

        return user;
    } catch (err) {
        throw err;
    }
};

const getUserRoles = async (userId, systemRoles) => {
    try {
        // Fetch the user by userId
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const userRoles = user.roles ? (Array.isArray(user.roles) ? user.roles : JSON.parse(user.roles)) : [];

        // Helper function to check if a role exists in user's assigned roles
        const assignAllowedStatus = (roles) => {
            return roles.map((role) => {
                return {
                    ...role,
                    allowed: userRoles.includes(role.id)
                };
            });
        };

        // Process system roles by checking the user's roles and categorising them
        const processedRoles = {
            addSystemVariables: assignAllowedStatus(systemRoles.addSystemVariables),
            editSystemVariables: assignAllowedStatus(systemRoles.editSystemVariables),
            viewDetails: assignAllowedStatus(systemRoles.viewDetails),
            settings: assignAllowedStatus(systemRoles.settings)
        };

        console.log(processedRoles);
        return processedRoles;
    } catch (err) {
        throw err;
    }
};

const assignRole = async (userId, roleId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Ensure roles is an array or initialize as an empty array if null
        let roles = user.roles ? (Array.isArray(user.roles) ? user.roles : JSON.parse(user.roles)) : [];

        // Check if the role is already assigned
        if (!roles.includes(roleId)) {
            roles.push(roleId);
            user.roles = roles;

            // Save the updated user
            await user.save();

            return { message: 'Role assigned successfully', roles: user.roles };
        }
        else {
            return { message: 'Role is already assigned', roles: user.roles };
        }
    } catch (err) {
        throw err;
    }
};

const revokeRole = async (userId, roleId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Parse roles from JSON string to array 
        let roles = user.roles ? (Array.isArray(user.roles) ? user.roles : JSON.parse(user.roles)) : [];

        // Convert roleId to integer for comparison
        const roleIdAsNumber = parseInt(roleId, 10);

        // Check if the role exists in the user's roles
        if (roles.includes(roleIdAsNumber)) {
            roles = roles.filter(role => role !== roleIdAsNumber);
            user.roles = roles;

            // Save the updated user
            const result = await user.save();

            return { message: 'Role revoked successfully', roles: user.roles };
        } else {
            return { message: 'Role not assigned to this user', roles: user.roles };
        }
    } catch (err) {
        console.error('Error revoking role:', err);
        throw err;
    }
};



module.exports = {
    loginUser,
    registerUser,
    allUsers,
    deleteUser,
    oneUser,
    getUserRoles,
    assignRole,
    revokeRole
};
