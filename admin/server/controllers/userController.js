const {
    loginUser,
    registerUser,
    allUsers,
    deleteUser,
    oneUser,
    getUserRoles,
    assignRole,
    revokeRole
} = require('../services/userService');

const login = async (req, res) => {
    //get user inputs
    const { username, password } = req.body;

    try {
        //login and send a json response
        const { token, user } = await loginUser(username, password);
        res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const register = async (req, res) => {
    //get user inputs
    const {username, firstName, secondName, idNumber, phoneNumber} = req.body;

    try{
        //register and send a json response
        const {token,user} = await registerUser(username, firstName, secondName, idNumber, phoneNumber);
        res.status(200).json({
            message:'Registration successful',
            token,
            user: { id: user.id, username: user.username },
        });
    }catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const users = async (req, res) => {
    let { userId } = req.query;
    userId = parseInt(userId, 10);
    console.log(userId)
    try{
        const usersList = await allUsers(userId);
        res.status(200).json(usersList)
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        // get user id from query params
        const userId = req.query.id;
        await deleteUser(userId);
        res.status(200).json({
            message: 'User successfully removed'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        // get user id from query params
        const userId = req.query.id;
        const user = await oneUser(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const userRoles = async (req, res) => {
    try {
        // get the user id and the system variables object
        const { userId, systemRoles } = req.body;
        // Ensure userId is defined
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const roles = await getUserRoles(userId, systemRoles);

        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const assignUserRole = async (req, res) => {
    try {
        const userId = parseInt(req.query.userId, 10);
        const roleId = parseInt(req.query.roleId, 10);

        console.log(req.query);

        // Ensure userId and roleId are provided and valid
        if (isNaN(userId) || isNaN(roleId)) {
            return res.status(400).json({ message: 'User Id and role Id must be valid integers' });
        }

        await assignRole(userId, roleId);
        res.status(200).json({ message: 'Role successfully assigned' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const revokeUserRole = async (req, res) => {
    try {
        //get userId and roleId
        const { userId, roleId } = req.query;

        //ensure userid and role id are provided
        if (!userId || !roleId) {
            return res.status(400).json({ message: 'User Id and role id are required' });
        }
        const revoke = await revokeRole(userId, roleId);
        res.status(200).json(revoke);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    login,
    register,
    users,
    remove,
    getOne,
    userRoles,
    assignUserRole,
    revokeUserRole
};
