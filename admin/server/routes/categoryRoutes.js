const express = require('express');
const {
    addCategory
} = require('../controllers/categoryController');

const router = express.Router();

//login
router.post('/addNew', addCategory);


module.exports = router;
