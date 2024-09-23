const express = require('express');
const { 
    login, 
    register,
    users,
    remove,
    getOne 
} = require('../controllers/userController');

const router = express.Router();

 //login
router.post('/login', login);
 //register
router.post('/register', register);
 //all users
router.get('/all', users);
 //delete a users
router.delete('/remove', remove);
 //get one user
router.get('/one', getOne);


module.exports = router;
