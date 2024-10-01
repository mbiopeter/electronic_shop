const express = require('express');
const {
    uploadProduct
} = require('../controllers/productsController');

const router = express.Router();

//addnewProduct
router.post('/addNew', uploadProduct);


module.exports = router;
