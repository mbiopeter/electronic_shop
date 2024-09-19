const express = require('express');
const { login, register,users } = require('../controllers/userController');

const router = express.Router();

 //login
router.post('/login', login);
 //register
router.post('/register', register);
 //all users
router.get('/all', users);


module.exports = router;
