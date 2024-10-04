const express = require('express');
const {
    uploadProduct,
    getAllProducts,
    getOutOfStockProducts,
    getLimitedProducts,
    getOtherProducts,
    deleteProduct
} = require('../controllers/productsController');

const router = express.Router();

//addnewProduct
router.post('/addNew', uploadProduct);
//get all products
router.get('/products', getAllProducts);
//get out of stock products
router.get('/outofstock', getOutOfStockProducts);
//get lo=imited products
router.get('/limited', getLimitedProducts);
//get other products
router.get('/otherproducts', getOtherProducts);
//get other products
router.delete('/remove', deleteProduct);


module.exports = router