const Coupon = require('../models/coupon');
const {
    addCoupon,
    all,
    one
} = require('../services/couponService');
const { remove } = require('../utils/delete');
const add = async (req, res) => {
    try {
        const {
            name,
            discountType,
            discountAmount,
            minimumAmount,
            expiry,
            productName,
        } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Coupon value is required!' });
        }
        //check if coupon exists
        const check = await one(name);
        if (check) {
            return res.status(400).json({ error: 'Coupon already exists' });
        }
        await addCoupon(name, discountType, discountAmount, minimumAmount, expiry, productName);
        res.status(200).json({ message: 'Coupon successfully created!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

const getall = async (req, res) => {
    try {
        const coupons = await all();
        res.status(200).json(coupons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const removeCoupon = async (req, res) => {
    try {
        const id = req.query.id;
        await remove(id, Coupon);
        res.status(200).json({
            message: 'Coupon successfully removed'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
    add,
    getall,
    removeCoupon
}