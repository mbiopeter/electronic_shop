const express = require('express');
const {
    getBrands,
    addBrand,
    removeBrand
} = require('../controllers/brandsController');

const router = express.Router();

//add new brand
router.post('/addNew', addBrand);
//get all brands
router.get('/all', getBrands);
//delete a brand
router.delete('/remove', removeBrand);


module.exports = router;
