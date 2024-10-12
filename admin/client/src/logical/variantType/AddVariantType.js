import axios from 'axios';
import { variantTypeUrl } from '../consts/apiUrl';

export const handleAddVariantType = async (name) => {
    let resp = {
        message: '',
        type: ''
    };

    try {

        const response = await axios.post(`${variantTypeUrl}/addNew`, { name });
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {

        resp.message = error.response?.data?.message || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
