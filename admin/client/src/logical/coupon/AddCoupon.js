import axios from 'axios';
import { couponUrl } from '../consts/apiUrl';

export const handleAddCoupon = async (
    name,
    couponValue,
    discountAmount,
    minimumAmount,
    expiry,
    product) => {
    let resp = {
        message: '',
        type: ''
    };
    const data = {
        name: name,
        discountType: couponValue,
        discountAmount: discountAmount,
        minimumAmount: minimumAmount,
        expiry: expiry,
        productName: product
    }

    try {

        const response = await axios.post(`${couponUrl}/addNew`, data);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {

        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
