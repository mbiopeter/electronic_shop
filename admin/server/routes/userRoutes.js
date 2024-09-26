const express = require('express');
const { 
    login, 
    register,
    users,
    remove,
    getOne,
    userRoles,
    assignUserRole,
    revokeUserRole
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
//get the current user roles
router.post('/roles', userRoles);
//assigne a role to the user
router.post('/role/assign', assignUserRole);
//rvoke a role to the user
router.post('/role/revoke', revokeUserRole);

module.exports = router;
