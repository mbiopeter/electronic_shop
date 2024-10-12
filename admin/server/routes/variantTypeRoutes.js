const express = require('express');
const {
    add,
    all,
    deleteVariantType
} = require('../controllers/variantTypeController');

const router = express.Router();

//add new variant type 
router.post('/addNew', add);
//get all variant type
router.get('/all', all);
//delete variant type
router.delete('/remove', deleteVariantType);


module.exports = router;
