const express = require('express');
const {
    add,
    all,
    removeVariant
} = require('../controllers/variantController');

const router = express.Router();

//add new variant 
router.post('/addNew', add);
//get all variant
router.get('/all', all);
//delete variant
router.delete('/remove', removeVariant);


module.exports = router;
