import axios from 'axios';
import { subCategoriesUrl } from '../consts/apiUrl';

export const addSubCategory = async (name, category, image) => {
    const formData = new FormData();
    if (image) {
        // Convert base64 to Blob to append it as a file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image_${Date.now()}.jpg`);
    }
    formData.append('name', name);
    formData.append('category', category);

    let resp = {
        message: '',
        type: ''
    };


    try {
        const response = await axios.post(`${subCategoriesUrl}/addNew`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
