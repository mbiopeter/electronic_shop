const { loginUser,registerUser,allUsers } = require('../services/userService');

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
    console.log('Request body:', req.body); 
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
        res.status(400).json({ message: error.message });
    }
}

const users = async (req, res) => {
    try{
        const usersList = await allUsers();
        res.status(200).json(usersList)
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
    login,
    register,
    users
};
