import axios from 'axios';
import { variantUrl } from '../consts/apiUrl';

export const handleAddVariant = async (name, variantType) => {
    let resp = {
        message: '',
        type: ''
    };

    try {

        const response = await axios.post(`${variantUrl}/addNew`, { name, variantType });
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {

        resp.message = error.response?.data?.message || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
