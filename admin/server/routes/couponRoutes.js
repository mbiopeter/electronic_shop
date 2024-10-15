const express = require('express');
const {
    add,
    getall,
    removeCoupon
} = require('../controllers/couponController');

const router = express.Router();

//add new coupon
router.post('/addNew', add);
//get all coupons
router.get('/all', getall);
//delete a coupon
router.delete('/remove', removeCoupon);


module.exports = router;
