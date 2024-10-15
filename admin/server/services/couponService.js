const Coupon = require('../models/coupon');

const addCoupon = async (name, discountType, discountAmount, minimumAmount, expiry, productName) => {
    try {

        //check for required fields
        if (!discountType) {
            throw new Error('Discount Type field is required');
        }
        if (!discountAmount) {
            throw new Error('Discount Amount field is required');
        }
        if (!expiry) {
            throw new Error('Expiery date field is required');
        }

        const newCoupon = await Coupon.create({ name, discountType, discountAmount, minimumAmount, expiry, productName });
        return newCoupon;
    } catch (err) {
        throw new Error(err);
    }
}

const all = async () => {
    try {
        const coupons = await Coupon.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
        });
        const formattedCoupons = coupons.map(Coupons => {
            const formattedDate = new Date(Coupons.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            return {
                ...Coupons.dataValues,
                addedDate: formattedDate,
            };
        });
        return formattedCoupons;
    } catch (err) {
        throw new Error(err);
    }
}
const one = async (name) => {
    try {
        const coupon = await Coupon.findOne({ where: { name: name } });
        return coupon;
    } catch (err) {
        throw new Error('Database error while fetching coupon');  // Only throw error for actual DB issues
    }
};

module.exports = {
    addCoupon,
    all,
    one
}