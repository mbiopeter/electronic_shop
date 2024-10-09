const express = require('express');
const {
    getCategories,
    addCategory,
    removeCategory
} = require('../controllers/categoryController');

const router = express.Router();

//login
router.post('/addNew', addCategory);
//get all categories
router.get('/all', getCategories);
//login
router.delete('/remove', removeCategory);


module.exports = router;
