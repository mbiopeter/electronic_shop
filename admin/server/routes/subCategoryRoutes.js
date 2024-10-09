const express = require('express');
const {
    getSubCategories,
    addSubCategory,
    removeSubCategory
} = require('../controllers/subCategoryController');

const router = express.Router();

//login
router.post('/addNew', addSubCategory);
//get all categories
router.get('/all', getSubCategories);
//login
router.delete('/remove', removeSubCategory);


module.exports = router;
