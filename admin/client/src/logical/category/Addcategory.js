import axios from 'axios';
import { categoriesUrl } from '../consts/apiUrl';

export const addCategory = async (name, image) => {
    const formData = new FormData();
    if (image) {
        // Convert base64 to Blob to append it as a file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image_${Date.now()}.jpg`);
    }
    formData.append('name', name);

    let resp = {
        message: '',
        type: ''
    };


    try {
        const response = await axios.post(`${categoriesUrl}/addNew`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
