import axios from 'axios';
import { brandsUrl } from '../consts/apiUrl';

export const addBrand = async (name, subCategory, image) => {
    const formData = new FormData();
    if (image) {
        // Convert base64 to Blob to append it as a file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image_${Date.now()}.jpg`);
    }
    formData.append('name', name);
    formData.append('subCategory', subCategory);

    let resp = {
        message: '',
        type: ''
    };


    try {
        const response = await axios.post(`${brandsUrl}/addNew`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
