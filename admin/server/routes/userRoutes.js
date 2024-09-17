const express = require('express');
const { login } = require('../controllers/userController');

const router = express.Router();

// POST /login
router.post('/login', login);

module.exports = router;
